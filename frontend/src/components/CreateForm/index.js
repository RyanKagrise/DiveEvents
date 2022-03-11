import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { ValidationError } from '../utils/ValidationError';
import { ErrorMessage } from '../utils/ErrorMessage'
import { createNewEvent } from '../../store/event'
import * as sessionActions from '../../store/session';

const CreateForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [region, setRegion] = useState('');
  const [content, setContent] = useState('');
  const [capacity, setCapacity] = useState('');
  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});
  let history = useHistory();

  useEffect(() => {
    const validationErrors = [];
    if (name.length > 50)
      return validationErrors.push(
        'Please limit names to less than 50 characters!'
      );
    if (region.length > 25)
      return validationErrors.push(
        'Pleast limit region names to less than 25 characters!'
      )
    if (content.length > 255)
      return validationErrors.push(
        'Please limit event content to less than 255 characters!'
      )
    setErrors(validationErrors);
  }, [name, region, content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      userId: sessionUser.id,
      name,
      date,
      region,
      content,
      capacity,
    };

    let createdEvent;

    try {
      createdEvent = await dispatch(createNewEvent(newEvent));
    } catch (error) {
      history.push('/events/create')
    }
    if (createNewEvent) {
      setErrorMessages({});
      setErrors([]);
      history.push('/events');
    }
  }

  return (
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
          <ErrorMessage message={errorMessages.overall} />
        </div>
        <div className='PLACEHOLDER'>
          <label className='PLACEHOLDER'>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className='PLACEHOLDER'>
            <input
              type='date'
              placeholder='yyyy-mm-dd'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label className='PLACEHOLDER'>
            <input
              type='text'
              placeholder='Region'
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </label>
          <label className='PLACEHOLDER'>
            <input
              type='text'
              placeholder='Description'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
          <label className='PLACEHOLDER'>
            <input
              type='number'
              placeholder='Capacity'
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </label>

          <button
            type='submit'
            disabled={errors.length > 0}
            className='PLACEHOLDER'
          > Create New Event </button>
        </div>
      </form>
  )

};

export default CreateForm;
