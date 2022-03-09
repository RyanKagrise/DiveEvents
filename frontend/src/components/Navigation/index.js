import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
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
          <NavLink exact to="/">Home</NavLink>
        </div>
        <div>
          {isLoaded && sessionLinks}
        </div>
      </li>
    </ul>
  );
}

export default Navigation;
