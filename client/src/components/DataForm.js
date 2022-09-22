import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/DataForm'
import DataFormInfo from './DataFormInfo'

const DataForm = ({
  _id,
  formId,
  formName,
  formSubject,
  formType,
  createdAt,
  formStatus,
}) => {
  const { setEditDataForm, deleteDataForm } = useAppContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{formName.charAt(0)}</div>
        <div className='info'>
          <h5>{formId}</h5>
          <p>{formName}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <DataFormInfo icon={<FaLocationArrow />} text={formSubject} />
          <DataFormInfo icon={<FaCalendarAlt />} text={date} />
          <DataFormInfo icon={<FaBriefcase />} text={formType} />
          <div className={`status ${formStatus}`}>{formStatus}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-dataForm'
              className='btn edit-btn'
              onClick={() => setEditDataForm(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteDataForm(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default DataForm
