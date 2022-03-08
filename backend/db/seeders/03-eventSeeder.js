'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Events', [
        {
          hostId: 1,
          venueId: 1,
          name: 'St Anthonys',
          date: '2022-04-05',
          capacity: 10,
        },
        {
          hostId: 2,
          venueId: 2,
          name: 'Mala Pier',
          date: '2022-04-15',
          capacity: 15,
        },
        {
          hostId: 3,
          venueId: 3,
          name: 'Hookipa Lookout',
          date: '2022-04-25',
          capacity: 5,
        },
        {
          hostId: 1,
          venueId: 1,
          name: 'Five Graves Caverns',
          date: '2022-04-10',
          capacity: 2,
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Events', null, {});
  }
};
