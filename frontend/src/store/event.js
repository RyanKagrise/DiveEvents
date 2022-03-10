import { csrfFetch } from "./csrf"
import { ValidationError } from '../components/utils/ValidationError'

//action variables
const GET_EVENTS = 'events/getEvents';
const GET_EVENT = 'events/getEvent';
const CREATE_EVENT = 'events/createEvent';

const DELETE_EVENT = 'events/deleteEvent';


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

const createEvent = newEvent => {
  return {
    type: CREATE_EVENT,
    newEvent
  }
}

// const editEvent = editedEvent => {
//   return {
//     type: EDIT_EVENT,
//     editedEvent
//   }
// }

const deleteEvent = deletedEvent => {
  return {
    type: DELETE_EVENT,
    deletedEvent
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

export const newEvent = (data) => async dispatch => {
  try {
    const res = await fetch(`/api/events`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
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

//reducer

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {

    case GET_EVENTS: {
      action.events.forEach((event) => (newState[event.id] = event));
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

    case CREATE_EVENT: {
      return {
        ...state,
        [action.event.id]: action.event,
      };
    }

    default:
      return state;
  }
}


export default eventsReducer;
