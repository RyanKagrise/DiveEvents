const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Event, User, Category } = require('../../db/models');

const router = express.Router();


const categoryDoesNotExist = (id) => {
  const err = Error("This event does not exist!");
  err.errors = [`Event with the id of ${id} does not exist!`];
  err.title = 'Event does not exist.';
  err.status = 404;
  return err;
}


const createCategoryValidations = [
  check("type")
  .exists({ checkFalsy: true })
  .withMessage("Type field can't be empty!"),
  check("type")
  .isLength({ max: 50 })
  .withMessage("Type can't be longer than 50 characters!"),
];

router.post(
  '/',
  requireAuth,
  createCategoryValidations,
  asyncHandler(async function (req, res, next) {
    const categoryDetails = req.body;
    const category = await Category.create(categoryDetails);

    const newCategory = await Category.findOne({
      where: {
        id
      },
      include: [
        { model: Event },
        { model: User }
      ]
    })
    res.json(newCategory)
  })
);

router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async function (req, res, next) {
    const userId = req.user.id;
    const category = await Category.findByPk(req.params.id);
    console.log('thisssssssssssssssss' , category.userId)
    if (category) {
      if (userId === category.userId) {
        await category.destroy();
      } else {
        const err = Error('Unauthorized user');
        err.errors = ['unauthorized delete'];
        err.title = 'User not authorized to delete';
        err.status = 401;
        return err;
      }
      res.json(req.params.id)
    } else {
      next(categoryDoesNotExist(req.params.id));
    }
  })
)


module.exports = router;
