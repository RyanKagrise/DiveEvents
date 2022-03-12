const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Event, User, Category } = require('../../db/models');


const router = express.Router();

router.get(
  '/',
  asyncHandler(async function (_req, res) {
    const events = await Event.findAll({
      include: [
        { model: User },
        { model: Category }
      ]
    });
    return res.json(events);
  }));


const eventDoesNotExist = (id) => {
  const err = Error("This event does not exist!");
  err.errors = [`Event with the id of ${id} does not exist!`];
  err.title = 'Event does not exist.';
  err.status = 404;
  return err;
}

router.get(
  '/:id',
  asyncHandler(async function (req, res, next) {
    const event = await Event.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Category }
      ]
    });
    if (event) {
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
    .exists({ checkFalsy: true })
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

    const newEvent = await Event.findOne({
      where: {
        id: event.id
      },
      include: [
        { model: User },
        { model: Category }
      ]
    })

    res.json(newEvent);
  })
);

router.put(
  '/:id',
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const eventId = req.body.id;
    const userId = req.body.userId;
    const name = req.body.name;
    const date = req.body.date;
    const region = req.body.region;
    const content = req.body.content;
    const capacity = req.body.capacity;

    const event = await Event.findByPk(eventId);
    if (event) {
      if (userId === event.userId) {
        event.name = name;
        event.date = date;
        event.region = region;
        event.content = content;
        event.capacity = capacity;
        await event.save();

        const editedEvent = await Event.findOne({
          where: {
            id: event.id
          },
          include: [
            { model: User },
            { model: Category }
          ]
        })

        res.json(editedEvent);
      } else {
        const err = Error('Unauthorized user');
        err.errors = ['unauthorized edit'];
        err.title = 'User not authorized to edit';
        err.status = 401;
        return err;
      }
    } else {
      next(eventDoesNotExist(req.body.id))
    }
  })
);

router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    const event = await Event.findByPk(req.params.id);
    if (event) {
      if (userId === event.userId) {
        await event.destroy();
      } else {
        const err = Error('Unauthorized user');
        err.errors = ['unauthorized delete'];
        err.title = 'User not authorized to delete';
        err.status = 401;
        return err;
      }
      res.json(req.params.id)
    } else {
      next(eventDoesNotExist(req.params.id));
    }
  })
)

module.exports = router;
