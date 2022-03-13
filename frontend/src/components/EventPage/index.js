import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchEvent } from '../../store/event'
import { Redirect, NavLink, useHistory } from 'react-router-dom'
import { removeEvent } from '../../store/event'

import CategoriesList from './CategoriesList'


import './EventPage.css'

const EventPage = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const eventParam = useParams();

  const eventId = eventParam.id

  const [deleteOption, setDeleteOption] = useState(false);

  const category = useSelector((state) => state.event.Categories)
  const sessionUser = useSelector((state) => state.session.user);

  const event = useSelector((state) => state.event[eventId]);


  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, [dispatch]);

  const destroyEventButton = async (e) => {
    e.preventDefault();
    const payload = {
      userId: sessionUser.id,
      id: eventId
    }
    let destroyedEvent;
    destroyedEvent = await dispatch(removeEvent(payload))
      .catch(error => (console.log('error in delete')))

    if (destroyedEvent) {
      history.push('/events');
    }
  }


  const createCategoryButton = () => {
    if (!sessionUser) return;
    if (sessionUser.id === event?.userId) {
      return (
      <>
        <NavLink className='standard-link' exact to={`/events/${event?.id}/categories/create`}>Create Category</NavLink>

      </>
      );
    }
  };

  const showDeleteButton = () => {
    if (deleteOption === true) {
      return (
        <>
          <ul>
            <li>
              <button
                type='submit'
                onClick={destroyEventButton}
                className='standard-link'
              >
                Delete Event
              </button>
              <button
                type='submit'
                onClick={() => setDeleteOption(false)}
                className='standard-link'
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
            className='standard-link'
          >
            Delete Event
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
          <NavLink className='standard-link' exact to={`/events/${event?.id}/edit`}>
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
            <h2 className='event-title'>{event?.name}</h2>
            {event ? <img className='event-photo' src='/images/eventPhoto.jpg' alt='' /> : null}
            <p className='event-date'>Date: {event?.date}</p>
            <p className='event-content'>Description: {event?.content}</p>
            <p className='event-capacity'>Capacity: {event?.capacity}</p>
            <ul className='PLACEHOLDER'> Categories:
              {event?.Categories?.map((category) => (
                <CategoriesList key={category.id} category={category}  />
              ))}
            </ul>
          </div>
          <div className='buttons-list'>
            {createCategoryButton(event)}
            {editEventButton(event)}
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
