'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Venues', [
      {
        name: 'South Side',
        city: 'Kihei',
        state: 'Hawaii',
        zipCode: '96753',
      },
      {
        name: 'West Side',
        city: 'Lahaina',
        state: 'Hawaii',
        zipCode: '96767',
      },
      {
        name: 'North Side',
        city: 'Kahului',
        state: 'Hawaii',
        zipCode: '96732',
      },
      {
        name: 'East Side',
        city: 'Hana',
        state: 'Hawaii',
        zipCode: '96713',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Venues', null, {});
  }
};
