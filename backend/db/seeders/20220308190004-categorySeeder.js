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
          eventId: 1,
        },
        {
          type: 'Advanced',
          eventId: 3,
        },
        {
          type: 'Wreck',
          eventId: 1,
        },
        {
          type: 'Beginner',
          eventId: 2,
        },
        {
          type: 'Night',
          eventId: 3,
        },
        {
          type: 'Cave',
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
