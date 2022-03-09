import React, { useState } from "react";
import { fetchEvent } from '../../store/event';
import { useDispatch, useSelector } from "react-redux";

const EventForm = () => {

  const dispatch = useDispatch();
  
  const sessionUser = useSelector(state => state.session.user)

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [content, setContent] = useState('');
  const [] = useState('');


}
