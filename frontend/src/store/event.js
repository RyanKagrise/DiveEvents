import { csrfFetch } from "./csrf"
import { ValidationError } from '../components/utils/ValidationError'

//action variables
const GET_EVENTS = 'events/getEvents';
const GET_EVENT = 'events/getEvent';
const CREATE_EVENT = 'events/createEvent';
const EDIT_EVENT = 'events/editEvent'
const DELETE_EVENT = 'events/deleteEvent';
const DELETE_EVENTS = 'events/deleteEvents'


//action creators
const getEvents = events => {
  return {
    type: GET_EVENTS,
    events
  }
}

const getEvent = event => {
  return {
    type: GET_EVENT,
    event
  }
}

const createEvent = event => {
  return {
    type: CREATE_EVENT,
    event
  }
}

const editEvent = editedEvent => {
  return {
    type: EDIT_EVENT,
    editedEvent
  }
}

const deleteEvent = id => {
  return {
    type: DELETE_EVENT,
    id
  }
}

//referenced in session.js store
export const deleteEvents = () => {
  return {
    type: DELETE_EVENTS
  }
}




//thunk action creators
export const fetchEvents = () => async dispatch => {
  const res = await csrfFetch(`/api/events`);

  if (res.ok) {
    const events = await res.json();
    dispatch(getEvents(events));
  }
}

export const fetchEvent = (id) => async dispatch => {
  const res = await csrfFetch(`/api/events/${id}`);

  if (res.ok) {
    const event = await res.json();
    dispatch(getEvent(event));
  }
}

export const createNewEvent = (data) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/events`, {
      method: 'post',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let error;
      if (res.status === 422) {
        error = await res.json();
        throw new ValidationError(error.errors, res.statusText);
      } else {
        let errorJSON;
        error = await res.text();
        try {
          errorJSON = JSON.parse(error);
        } catch {
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }

    const event = await res.json();
    dispatch(createEvent(event));
    return event;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = (event) => async dispatch => {
  const res = await csrfFetch(`/api/events/${event.id}`, {
    method: 'put',
    body: JSON.stringify(event)
  });
  if (res.ok) {
    const editedEvent = await res.json();
    dispatch(editEvent(editedEvent));
    return editedEvent;
  }
}

export const removeEvent = (event) => async dispatch => {
  const res = await csrfFetch(`/api/events/${event.id}`, {
    method: 'delete'
  });
  if (res.ok) {
    const removedEvent = await res.json();
    await dispatch(deleteEvent(removedEvent))
    return removedEvent;
  }
  return false;
}


//reducer
const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS: {
      const newState = { ...state };
      action.events.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    }

    case CREATE_EVENT: {
      const newState = {
        ...state,
        [action.event.id]: action.event,
      };
      return newState;
    }

    case GET_EVENT: {
      return {
        ...state,
        [action.event.id]: {
          ...state[action.event.id],
          ...action.event,
        },
      };
    }

    case DELETE_EVENT: {
      const newState = {...state};
      delete newState[action.id];
      return newState
    }

    case EDIT_EVENT:
      return {
        ...state,
        [action.editedEvent.id]: action.editedEvent
      }
    default:
      return state;
  }
};



export default eventsReducer;
