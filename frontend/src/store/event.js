import { csrfFetch } from "./csrf"

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

    default:
      return state;
  }
}


export default eventsReducer;
