import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import DataForm from './DataForm'
import Wrapper from '../assets/wrappers/DataFormsContainer'
import PageBtnContainer from './PageBtnContainer'

const DataFormsContainer = () => {
  const {
    getDataForms,
    dataForms,
    isLoading,
    page,
    totalDataForms,
    search,
    searchFormStatus,
    searchFormType,
    sort,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    getDataForms()
    // eslint-disable-next-line
  }, [page, search, searchFormStatus, searchFormType, sort])
  if (isLoading) {
    return <Loading center />
  }

  if (dataForms.length === 0) {
    return (
      <Wrapper>
        <h2>No forms to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalDataForms} dataFrom{dataForms.length > 1 && 's'} found
      </h5>
      <div className='dataForms'>
        {dataForms.map((dataForm) => {
          return <DataForm key={dataForm._id} {...dataForm} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default DataFormsContainer
