import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { DataFormStatsContainer, Loading, DataFormChartsContainer } from '../../components'

const DataFormStats = () => {
  const { showDataFormStats, isLoading, monthlyDataFormApplications } = useAppContext()

  useEffect(() => {
    showDataFormStats()
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
      <DataFormStatsContainer />
      {monthlyDataFormApplications.length > 0 && <DataFormChartsContainer />}
    </>
  )
}

export default DataFormStats