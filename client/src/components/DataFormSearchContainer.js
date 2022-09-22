import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const DataFormSearchContainer = () => {
  const {
    isLoading,
    search,
    searchFormStatus,
    searchFormType,
    sort,
    sortOptions,
    handleChange,
    clearDataFormFilters,
    formTypeOptions,
    formStatusOptions,
  } = useAppContext()
  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    clearDataFormFilters()
  }
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Forms</h4>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='Form Status'
            name='searchFormStatus'
            value={searchFormStatus}
            handleChange={handleSearch}
            list={['all', ...formStatusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText='type'
            name='searchFormType'
            value={searchFormType}
            handleChange={handleSearch}
            list={['all', ...formTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default DataFormSearchContainer
