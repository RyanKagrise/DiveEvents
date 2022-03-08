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


module.exports = router;
