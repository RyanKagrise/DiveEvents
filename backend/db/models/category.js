'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsTo(models.Event, { foreignKey: "eventId" });
  };
  return Category;
};
