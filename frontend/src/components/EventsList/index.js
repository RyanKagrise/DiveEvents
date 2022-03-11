import { NavLink, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchEvents } from '../../store/event';
import './EventsList.css'


const EventsList = () => {

  const dispatch = useDispatch();


  const events = useSelector((state) => state.event);
  const categoriesArray = useSelector((state) => state.event.Categories)
  const sessionUser = useSelector((state) => state.session.user);



  console.log('blakkkkkkkkkkkkkke', events['1'])
  console.log('SEPERATEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')

  console.log('categoriesssssssssssssssssssssssss', categoriesArray)

  console.log('SEPERATEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
  const eventsArray = Object.values(events);
  //const categoriesArray = Object.values(categories);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (!events) {
    return null;
  }

  const createEventButton = () => {
    if (!sessionUser) {
      return null;
    } else {
      return (
        <NavLink className="PLACEHOLDER" to="/events/create">Create Event</NavLink>
      );
    }
  };

  return (
    <>
      {createEventButton()}
      <div className='events-links'>
        <ul className='events-list'>
          {eventsArray.map((event) => (
            <NavLink
              to={`/events/${event.id}`}
              key={event.id}
              style={{ textDecoration: "none", padding: 25 }}
            >
              <h3 className='event-name'>{event?.name}</h3>
              <p className='event-date'>Date: {event?.date}</p>
              <p className='event-content'>{event?.content}</p>
              <p className='event-capacity'>Capacity: {event?.capacity}</p>
              <div className='PLACEHOLDER'>
                <div>{event.Categories.map((category) => (
                  <p>
                  
                  </p>
              ))}</div>
              </div>
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  )
};

export default EventsList;
