import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./SplashPage.css"

const SplashPage = () => {
  const sessionUser = useSelector(state => state.session.user);

  if(sessionUser) {
    return (
      <>
        <div className='splash-container'>

          <p className='title'> Welcome to Dive Events!</p>
          <img className='tank-photo' src="/images/scuba-background.jpg"/>
        </div>

      </>

    )
  }
  return (
      <div>

        <h2> FIGURE IT OUT </h2>
        <NavLink to='/signup'><button>Sign up here!</button></NavLink>
      </div>
  )
}


export default SplashPage;
