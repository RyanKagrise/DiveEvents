import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { ValidationError } from '../utils/ValidationError';
import { ErrorMessage } from '../utils/ErrorMessage'
import { createNewCategory } from '../../store/category'
import { fetchEvent } from '../../store/event'
import * as sessionActions from '../../store/session';
import './CreateCategory.css'

const CreateCategory = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const eventParams = useParams();
  const eventId = eventParams.id;
  const event = useSelector((state) => state.event[eventId]);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchEvent(eventId))
  }, [dispatch]);

  const [type, setType] = useState('');
  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const validationErrors = [];
    if (type.length > 50 || type.length < 1)
      validationErrors.push(
        'Type cannot be empty! Also please limit category types to less than 50 characters!'
      );
    setErrors(validationErrors);
  }, [type])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      type,
      userId: sessionUser.id,
      eventId
    };

    let createdCategory;
    try {
      createdCategory = await dispatch(createNewCategory(newCategory)).then(()=> history.push('/events/'));
    } catch (error) {
      console.log(error)
    }
}

  return (
    <>
      <div className='event-page-container'>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li className='validationErrors' key={idx}>{error}</li>
            ))}
          </ul>
          <div>
            <ErrorMessage message={errorMessages.overall} />
          </div>
          <div className='form-container-cat'>
            <label className='PLACEHOLDER'> Category:
              <input
              type='text'
              placeholder='Category'
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            </label>

            <button
            type='submit'
            disabled={errors.length > 0}
            className='PLACEHOLDER'
            >
              Create New Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
