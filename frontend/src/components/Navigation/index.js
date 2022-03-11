import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import EventsList from '../EventsList';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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
