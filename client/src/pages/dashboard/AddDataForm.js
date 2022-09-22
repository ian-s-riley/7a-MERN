import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddDataForm = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    formName,
    formId,
    formSubject,
    formSubjectOptions,
    formType,
    formTypeOptions,
    formStatus,
    formStatusOptions,
    handleChange,
    clearValues,
    createDataForm,
    editDataForm,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formName || !formId) {
      displayAlert()
      return
    }
    if (isEditing) {
      editDataForm()
      return
    }
    createDataForm()
  }
  const handleDataFormInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit Data Form' : 'Add Data Form'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* form id */}
          <FormRow
            type='text'
            name='formId'
            value={formId}
            handleChange={handleDataFormInput}
          />
          {/* form name */}
          <FormRow
            type='text'
            name='formName'
            value={formName}
            handleChange={handleDataFormInput}
          />
          {/* form subject */}
          <FormRowSelect
            name='formSubject'
            value={formSubject}
            handleChange={handleDataFormInput}
            list={formSubjectOptions}
          />
          {/* form status */}
          <FormRowSelect
            name='formStatus'
            value={formStatus}
            handleChange={handleDataFormInput}
            list={formStatusOptions}
          />
          {/* form type */}
          <FormRowSelect
            name='formType'
            labelText='Form Type'
            value={formType}
            handleChange={handleDataFormInput}
            list={formTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddDataForm
