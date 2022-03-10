const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Event, User } = require('../../db/models');


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

const createEventValidations = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name field can't be empty!"),
  check("name")
    .isLength({ max: 50 })
    .withMessage("Name can't be longer than 50 characters!"),
  check("date")
    .exists({ checkFalsy: true })
    .withMessage("Date field can't be empty!"),
  check("region")
    .exists({ checkFalsy: true})
    .withMessage("Region field can't be empty!"),
  check("region")
    .isLength({ max: 25 })
    .withMessage("Region can't be longer than 25 characters!"),
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Description field can't be empty!"),
  check("content")
    .isLength({ max: 255 })
    .withMessage("Description can't be longer than 255 characters!"),
  check("capacity")
    .exists({ checkFalsy: true })
    .withMessage("Capacity field can't be empty"),
  check("capacity")
    .isNumeric({ checkFalsy: true })
    .withMessage("Capacity has to be a number!"),
  handleValidationErrors,
];

router.post(
  '/',
  requireAuth,
  createEventValidations,
  asyncHandler(async function (req, res, next) {
    const eventDetails = req.body;
    const event = await Event.create(eventDetails);
    res.json(event);
  })
);


module.exports = router;
