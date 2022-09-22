import express from 'express'
const router = express.Router()

import {
  createDataForm,
  deleteDataForm,
  getAllDataForms,
  updateDataForm,
  showDataFormStats,
} from '../controllers/dataFormsController.js'

router.route('/').post(createDataForm).get(getAllDataForms)
// remember about :id
router.route('/dataFormStats').get(showDataFormStats)
router.route('/:id').delete(deleteDataForm).patch(updateDataForm)

export default router
