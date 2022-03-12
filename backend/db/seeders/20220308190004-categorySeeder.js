'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Categories', [
        {
          type: 'Scooters',
          userId: 1,
          eventId: 1,
        },
        {
          type: 'Advanced',
          userId: 3,
          eventId: 3,
        },
        {
          type: 'Wreck',
          userId: 1,
          eventId: 1,
        },
        {
          type: 'Beginner',
          userId: 2,
          eventId: 2,
        },
        {
          type: 'Night',
          userId: 3,
          eventId: 3,
        },
        {
          type: 'Cave',
          userId: 1,
          eventId: 4,
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
