import main from '../assets/images/main.jpg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            SBA <span>7(a)</span> Loan Application
          </h1>
          <p>
            An AI powered application to help manage your small business 7(a) loan submission. Everything you need to easily and correctly create your SBA 7(a) forms and connect with your lender to get your loan approved quickly.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='7(a) forms' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
