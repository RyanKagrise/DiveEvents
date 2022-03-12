import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import EventsList from '../EventsList';
import * as sessionActions from '../../store/session'

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);


  const demoHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({credential: 'demo@user.io', password: 'password'}))
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
    <>
      <div>
        <ProfileButton user={sessionUser} />
      </div>
      <div>
        <NavLink className='PLACEHOLDER' exact to ='/events'>Events</NavLink>
      </div>
    </>

    );
  } else {
    sessionLinks = (
      <>
          <LoginFormModal />
          <NavLink to="/signup" className='signup-link'>Sign Up</NavLink>
          <button
          onClick={demoHandler}
          className='PLACEHOLDER'
          >
            Demo User
          </button>

      </>
    );
  }

  return (
    <ul>
      <li className='nav-links'>
        <div>
          <NavLink className='signup-link' exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </div>
      </li>
    </ul>
  );
}

export default Navigation;
