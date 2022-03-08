'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    zipCode: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
  }, {});
  Venue.associate = function(models) {
    // associations can be defined here
    Venue.hasMany(models.Event, {foreignKey: "venueId" });
  };
  return Venue;
};
