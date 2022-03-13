import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchEvent } from '../../store/event'
import { Redirect, NavLink, useHistory } from 'react-router-dom'
import { removeCategory } from '../../store/category'
import './EventPage.css'

const CategoriesList = ({ category }) => {

  let history = useHistory();
  const dispatch = useDispatch();
  const eventParam = useParams();

  const eventId = eventParam.id

  const [deleteOption, setDeleteOption] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);

  const event = useSelector((state) => state.event[eventId]);



  const destroyCategoryButton = async (e) => {
    e.preventDefault();
    const payload = {
      id: category.id
    }
    let destroyedCategory;
    try {
      destroyedCategory = await dispatch(removeCategory(payload)).then(() => history.push('/events'));
    } catch (error) {
      (console.log('error in delete'))
    }

    if (destroyedCategory) {
      history.push('/events');
    }
  }

  const showDeleteButtonCategory = () => {

    if (deleteOption === true) {
      return (
        <>
          <ul>
            <li>
              <button
                type='submit'
                onClick={destroyCategoryButton}
                className='PLACEHOLDER'
              >
                Delete Category
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
            Delete Category
          </button>
        </>
      )
    }
  }


  if (sessionUser.id === event.userId) {
  return (
    <>
      <li  className='cat-list' key={category.id}>
        {category?.type}
      </li>
      <div>

        {showDeleteButtonCategory()}
      </div>
    </>

  )
} else {
  return (
    <>
      <li  className='cat-list' key={category.id}>
        {category?.type}
      </li>
    </>
    )
  }
}
export default CategoriesList;
