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
          name: 'St Anthonys',
          date: '2022-04-05',
          region: 'South',
          content: 'We will be doing a scooter dive out to the St Anthony boat wreck. This dive will be reserved for folks who have experience or have been there before!',
          capacity: 10,
        },
        {
          hostId: 2,
          name: 'Mala Pier',
          date: '2022-04-15',
          region: 'West',
          content: 'This beginner friendly dive is perfect for everyone! I heard the galapagos shark has been out on the edge of the reef!',
          capacity: 15,
        },
        {
          hostId: 3,
          name: 'Hookipa Lookout',
          date: '2022-04-25',
          region: 'North',
          content: 'This is for hardened veterans only. Expecting light winds, we will launch from Kahana park!',
          capacity: 5,
        },
        {
          hostId: 1,
          name: 'Five Graves Caverns',
          date: '2022-04-10',
          region: 'South',
          content: 'Looking for one or two people to join me on a night dive through the Makena/Five Graves cavern systems!',
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
