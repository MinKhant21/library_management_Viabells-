"use strict";

const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define("User", {
    user_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid.v4(),
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  model.associate = function (models) {
      // Define association with Borrows
      User.hasMany(models.Borrows, {
        foreignKey: 'user_id', // The foreign key in the Borrows table
      });
  };
  return model;
};
