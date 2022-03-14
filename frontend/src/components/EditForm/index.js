import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { ErrorMessage } from '../utils/ErrorMessage';
import { updateEvent } from '../../store/event';

const EditForm = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const eventParam = useParams();
  const eventId = eventParam.id;
  const event = useSelector((state) => state.event[eventId]);


  const [name, setName] = useState(event?.name);
  const [date, setDate] = useState(event?.date);
  const [region, setRegion] = useState(event?.region);
  const [content, setContent] = useState(event?.content);
  const [capacity, setCapacity] = useState(event?.capacity);
  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});

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

    const updatedEvent = {
      id: event.id,
      userId: sessionUser.id,
      name,
      date,
      region,
      content,
      capacity,
    };
    let editedEvent;
    try {
      editedEvent = dispatch(updateEvent(updatedEvent));
    } catch (error) {
      console.log('Error in edit form!')
    }
    if (editedEvent) {
      setErrorMessages({});
      setErrors([]);
      history.push('/events');
    }
  };

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
          <div className='form-container'>
            <label className='PLACEHOLDER'>
              <div className='PLACEHOLDER'>Name</div>
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className='PLACEHOLDER'>
              <div className='PLACEHOLDER'>Date</div>
              <input
                type='date'
                placeholder='yyyy-mm-dd'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            <label className='PLACEHOLDER'>
              <div className='PLACEHOLDER'>Region</div>
              <input
                type='text'
                placeholder='Region'
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
            </label>
            <label className='PLACEHOLDER'>
              <div className='PLACEHOLDER'>Description</div>
              <input
                type='text'
                placeholder='Description'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                />
            </label>
            <label className='PLACEHOLDER'>
              <div className='PLACEHOLDER'>Capacity</div>
              <input
                type='text'
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
              >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </>
  )
};


export default EditForm;
