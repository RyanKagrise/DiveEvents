import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./SplashPage.css"


const SplashPage = () => {

  const sessionUser = useSelector(state => state.session.user);


  if (sessionUser) {
    return (
      <>
        <div>
          <div className='splash-container'>

            <p className='title'> Welcome to Dive Events! </p>
            <img className='tank-photo' src="/images/scuba-background.jpg" alt='' />
            <p className='info-p'> Please visit the events page for upcoming diving events! </p>
          </div>
        </div>

      </>

    )
  } else {
    return (
      <div className="splash-container">

        <p className='title'> Welcome to Dive Events! </p>
        <img className='tank-photo' src="/images/scuba-background.jpg" alt='' />
        <NavLink to='/signup'><button className='sign-up-link'>Sign up here!</button></NavLink>
        <p className='info-p'> Please sign up/log in to see upcoming diving events! </p>
      </div>
    )
  }
}


export default SplashPage;
