import { NavLink, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchEvents } from '../../store/event';
import './EventsList.css'


const EventsList = () => {

  const dispatch = useDispatch();


  const events = useSelector((state) => state.event);


  const sessionUser = useSelector((state) => state.session.user);

  const eventsArray = Object.values(events);


  useEffect(() => {
  dispatch(fetchEvents());
  }, [dispatch]);

  if (!events) {
    return null;
  }


  return (
    <>
      <div className='event-page-container'>
        <p className='title'> Dive Events Page </p>
        <div className='main-event-container'>
          <ul>
            {eventsArray.map((event) => (
              <NavLink
                to={`/events/${event.id}`}
                key={event.id}
                className='event-layout'
                style={{ textDecoration: "none", padding: 25, marginTop: 0 }}
              >
                <h3 className='event-name'>{event?.name}</h3>
                <p className='event-date'>Date: {event?.date}</p>
                <p className='event-content'>Description: {event?.content}</p>
                <p className='event-capacity'>Capacity: {event?.capacity}</p>
                <div> Categories:
                  {event?.Categories?.map((category) => (
                  <p key={category?.id}>
                    {category?.type}
                  </p>
                  ))}
                </div>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
};

export default EventsList;
