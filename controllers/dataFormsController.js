import DataForm from '../models/DataForm.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
const createDataForm = async (req, res) => {
  const { formName, formId } = req.body

  if (!formName || !formId) {
    throw new BadRequestError('Please provide all values.')
  }
  req.body.createdBy = req.user.userId
  const dataForm = await DataForm.create(req.body)
  res.status(StatusCodes.CREATED).json({ dataForm })
}
const getAllDataForms = async (req, res) => {
  const { formStatus, formType, formSubject, sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  // add stuff based on condition

  if (formStatus && formStatus !== 'all') {
    queryObject.formStatus = formStatus
  }
  if (formType && formType !== 'all') {
    queryObject.formType = formType
  }
  if (formSubject && formSubject !== 'all') {
    queryObject.formSubject = formSubject
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = DataForm.find(queryObject)

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('formId')
  }
  if (sort === 'z-a') {
    result = result.sort('-formId')
  }

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const dataForms = await result

  const totalDataForms = await DataForm.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalDataForms / limit)

  res.status(StatusCodes.OK).json({ dataForms, totalDataForms, numOfPages })
}
const updateDataForm = async (req, res) => {
  const { id: dataFormId } = req.params
  const { formName, formId } = req.body

  if (!formName || !formId) {
    throw new BadRequestError('Please provide all values.')
  }
  const dataForm = await DataForm.findOne({ _id: dataFormId })

  if (!dataForm) {
    throw new NotFoundError(`No data form with id :${dataFormId}`)
  }
  // check permissions

  checkPermissions(req.user, dataForm.createdBy)

  const updatedDataForm = await DataForm.findOneAndUpdate({ _id: dataFormId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedDataForm })
}
const deleteDataForm = async (req, res) => {
  const { id: dataFormId } = req.params

  const dataForm = await DataForm.findOne({ _id: dataFormId })

  if (!dataForm) {
    throw new NotFoundError(`No dataForm with id :${dataFormId}`)
  }

  checkPermissions(req.user, dataForm.createdBy)

  await dataForm.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Data form removed' })
}
const showDataFormStats = async (req, res) => {
  
  let dataFormStats = await DataForm.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$formStatus', count: { $sum: 1 } } },
  ])

  dataFormStats = dataFormStats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})  

  const defaultDataFormStats = {   
    Blank: dataFormStats.Blank || 0,
    Incomplete: dataFormStats.Incomplete || 0,
    Review: dataFormStats.Review || 0,
    Complete: dataFormStats.Complete || 0,
  }

  let monthlyDataFormApplications = await DataForm.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyDataFormApplications = monthlyDataFormApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultDataFormStats, monthlyDataFormApplications })
}

export { createDataForm, deleteDataForm, getAllDataForms, updateDataForm, showDataFormStats }
