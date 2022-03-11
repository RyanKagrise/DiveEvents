import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchEvent } from '../../store/event'
import { Redirect, NavLink, useHistory } from 'react-router-dom'
import { removeEvent } from '../../store/event'
import './EventPage.css'

const EventPage = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const eventParam = useParams();

  const eventId = eventParam.id;

  const [deleteOption, setDeleteOption] = useState(false);


  const sessionUser = useSelector((state) => state.session.user);

  const event = useSelector((state) => state.event[eventId]);

  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, [dispatch]);

  const destroyEventButton = async (e) => {
    e.preventDefault();
    const payload = {
      userId: sessionUser.id,
      id: event?.id
    }
    let destroyedEvent;
    destroyedEvent = await dispatch(removeEvent(payload))
      .catch(error => (console.log('error in delete')))

    if (destroyedEvent.id) {
      history.push('/events');
    }
  }

  const showDeleteButton = () => {
    if (deleteOption === true) {
      return (
        <>
          <ul>
            <li>
              <button
                type='submit'
                onClick={destroyEventButton}
                className='PLACEHOLDER'
              >
                Delete Event
              </button>
              <button
                type='submit'
                onClick={() => setDeleteOption(false)}
              >
                Cancel Delete
              </button>
            </li>
          </ul>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={() => setDeleteOption(true)}
          >
            Delete
          </button>
        </>
      )
    }
  }



  const editEventButton = (event) => {
    if (!sessionUser) return;
    if (sessionUser.id === event?.userId) {
      return (
        <>
          <NavLink className='PLACEHOLDER' exact to={`/events/${event?.id}/edit`}>
            Edit Event
          </NavLink>
          {showDeleteButton()}
        </>
      )
    }
  }

  if (sessionUser) {
    return (
      <>
        <div className='event-page-container'>
          <div className='event-container'>
            <h2>{event?.name}</h2>
            {event ? <img className='event-photo' src='/images/eventPhoto.jpg' alt='' /> : null}
            <p className='event-date'>Date: {event?.date}</p>
            <p className='event-content'>Description: {event?.content}</p>
            <p className='event-capacity'>Capacity: {event?.capacity}</p>
          </div>
          {editEventButton(event)}
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
