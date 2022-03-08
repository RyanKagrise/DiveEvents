'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
      capacity: {
      type: DataTypes.INTEGER
    },
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};
