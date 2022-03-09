const express = require('express');
const asyncHandler = require('express-async-handler');

const { Event } = require('../../db/models');

const eventValidators = require('../../validations/events')

const router = express.Router();

router.get(
  '/',
  asyncHandler(async function(_req, res) {
    const events = await Event.findAll();
    return res.json(events);
  })
);

router.get(
  '/:id',
  asyncHandler(async function(req, res) {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId);
    return res.json(event);
  })
)
module.exports = router;
