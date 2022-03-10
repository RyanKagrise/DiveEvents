import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchEvent } from '../../store/event'
import { Redirect } from 'react-router-dom'
import './EventPage.css'

const EventPage = () => {

  const dispatch = useDispatch();
  const eventParam = useParams();

  const eventId = eventParam.id;

  const sessionUser = useSelector((state) => state.session.user);

  const event = useSelector((state) => state.event[eventId]);

  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, [dispatch]);

  if (sessionUser) {
    return (
      <>
        <div className='event-page-container'>
          <div className='event-container'>
            <h2>{event?.name}</h2>
            {event ? <img className='event-photo' src='/images/eventPhoto.jpg' alt='' /> : null}
            <p className='event-date'>Date: {event?.date}</p>
            <p className='event-content'>Date: {event?.content}</p>
            <p className='event-capacity'>Capacity: {event?.capacity}</p>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <Redirect to='/'></Redirect>
    )
  }
}


export default EventPage;
