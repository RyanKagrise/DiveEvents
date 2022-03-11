import { csrfFetch } from "./csrf"
import { ValidationError } from '../components/utils/ValidationError'

//action variables

const CREATE_CATEGORY = 'category/createCategory';
const DELETE_CATEGORY = 'category/deleteCategory';

//action creators

const createCategory = category => {
  return {
    type: CREATE_CATEGORY,
    category
  }
}

const deleteCategory = id => {
  return {
    DELETE_CATEGORY,
    id
  }
}

//thunk action creators
export const createNewCategory = (data) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/categories`, {
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

    const category = await res.json();
    dispatch(createCategory(category));
    return category;
  } catch (error) {
    throw error;
  }
}


export const removeCategory = (category) => async dispatch => {
  const res = await csrfFetch(`/api/categories/${category.id}`, {
    method: 'delete'
  });
  if (res.ok) {
    const removedCategory = await res.json();
    await dispatch(deleteCategory(removedCategory))
    return removedCategory;
  }
  return false;
}


//category reducer
const categoriesReducer = (state = {} , action) => {
  switch (action.type) {
    case CREATE_CATEGORY: {
      const newState = {
        ...state,
        [action.category.id]: action.category,
      };
      return newState;
    }

    case DELETE_CATEGORY: {
      const newState = {...state};
      delete newState[action.id];
      return newState
    }

    default:
      return state;
  }
};

export default categoriesReducer;
