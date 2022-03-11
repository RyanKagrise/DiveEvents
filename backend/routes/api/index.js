const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js')
const categoriesRouter = require('./category.js')

router.use('/session', sessionRouter);

router.use('/events', eventsRouter)

router.use('/users', usersRouter);

router.use('/categories', categoriesRouter);

module.exports = router;
