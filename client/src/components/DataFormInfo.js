import Wrapper from '../assets/wrappers/DataFormInfo'

const DataFormInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  )
}

export default DataFormInfo
