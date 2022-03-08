import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./SplashPage.css"

const SplashPage = () => {
  const sessionUser = useSelector(state => state.session.user);

  if(sessionUser) {
    return (
      <>
        <div>
            <div className='splash-container'>

              <p className='title'> Welcome to Dive Events! </p>
              <img className='tank-photo' src="/images/scuba-background.jpg" alt=''/>
              <p className='info-p'> Please look below for upcoming diving events! </p>

          </div>
              <img className='beach-background' src="/images/beach-background.jpg" alt=''/>
        </div>

      </>

    )
  }
  return (
      <div className="splash-container">

        <p className='title'> Welcome to Dive Events! </p>
        <img className='tank-photo' src="/images/scuba-background.jpg" alt=''/>
        <NavLink to='/signup'><button className='sign-up'>Sign up here!</button></NavLink>
        <p className='info-p'> Please sign up to see upcoming diving events! </p>
      </div>
  )
}


export default SplashPage;
