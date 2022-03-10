const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Event, User } = require('../../db/models');

const eventValidators = require('../../validations/events')

const router = express.Router();

router.get(
  '/',
  asyncHandler(async function(_req, res) {
    const events = await Event.findAll();
    return res.json(events);
  })
);


const eventDoesNotExist = (id) => {
  const err = Error("This event does not exist!");
  err.errors = [`Event with the id of ${id} does not exist!`];
  err.title = 'Event does not exist.';
  err.status = 404;
  return err;
}

router.get(
  '/:id',
  asyncHandler(async function(req, res, next) {
    const event = await Event.findByPk(req.params.id);
    if(event) {
      res.json(event);
    } else {
      next(eventDoesNotExist(req.params.id))
    }
  })
)

module.exports = router;
