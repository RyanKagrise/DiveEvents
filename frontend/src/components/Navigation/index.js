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
    return dispatch(sessionActions.login({credential: 'dive@demo.events', password: 'password1!'}))
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  }

  const createEventButton = () => {
    if (!sessionUser) {
      return null;
    } else {
      return (
        <NavLink className="standard-link" to="/events/create">Create Event</NavLink>
      );
    }
  };


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
    <>
      <div className='nav-header'>
        {createEventButton()}
        <NavLink className='standard-link' exact to ='/events'>Events</NavLink>
      </div>
      <div>
      <ProfileButton user={sessionUser} />
      </div>
    </>

    );
  } else {
    sessionLinks = (
      <>
          <LoginFormModal />
          <NavLink to="/signup" className='standard-link'>Sign Up</NavLink>
          <button
          onClick={demoHandler}
          className='standard-link'
          >
            Demo User
          </button>

      </>
    );
  }

  return (
    <ul>
      <li>
        <div className='nav-links'>
          <NavLink className='standard-link' exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </div>
      </li>
    </ul>
  );
}

export default Navigation;
