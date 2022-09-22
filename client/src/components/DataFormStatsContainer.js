import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaBan, FaEdit, FaCheck, FaTasks } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {
  const { dataFormStats } = useAppContext()
  const defaultStats = [
    {
      title: 'Forms Not Started',
      count: dataFormStats.Blank || 0,
      icon: <FaBan />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'Forms In Progress',
      count: dataFormStats.Incomplete || 0,
      icon: <FaEdit />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Forms In Review',
      count: dataFormStats.Review || 0,
      icon: <FaTasks />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Forms Completed',
      count: dataFormStats.Complete || 0,
      icon: <FaCheck />,
      color: '#00994d',
      bcg: '#eeffee',
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
