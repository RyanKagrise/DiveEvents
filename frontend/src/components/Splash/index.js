import { NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import "./SplashPage.css"

import { fetchEvents } from '../../store/event';

const SplashPage = () => {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const { eventId } = useParams();

  const events = useSelector(state => {
    return state.events.list.map(eventId => state.events[eventId]);
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (!events) {
    return null;
  }



  if(sessionUser) {
    return (
      <>
        <div>
            <div className='splash-container'>

              <p className='title'> Welcome to Dive Events! </p>
              <img className='tank-photo' src="/images/scuba-background.jpg" alt=''/>
              <p className='info-p'> Please look below for upcoming diving events! </p>
              <div className='events-links'>
                {events.map(event => {
                  return (
                    <NavLink key={event.name} to={`/events/${event.id}`}>
                      <div
                        className={
                          Number.parseInt(eventId) === event.id
                            ? 'nav-entry is-selected'
                            : 'nav-entry'
                        }
                      >
                        <div>
                          <div className='event-name'>{event.name}</div>
                          <div className='event-date'>{event.date}</div>
                        </div>
                      </div>
                    </NavLink>
                  )
                })}

              </div>
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
