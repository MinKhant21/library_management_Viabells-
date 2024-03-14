'use strict';
const {
  Model,
  
} = require('sequelize');
const uuid = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      User.hasMany(models.Books, {
        foreignKey: 'category_id', 
        onDelete: 'CASCADE', 
      });
    }
  }
  User.init({
    category_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: () => uuid.v4(),
    },
    name: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'User', // Specify the correct table name here
    // Remove the timestamps option
  });
  return User;
};
