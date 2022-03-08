'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    name: {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    address: {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    city: {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    state: {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    zipCode: {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
  }, {});
  Venue.associate = function(models) {
    // associations can be defined here
    Venue.hasMany(models.Event, {foreignKey: "venueId" });
  };
  return Venue;
};
