"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Borrows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Define association with User
        Borrows.belongsTo(models.User, {
          foreignKey: 'user_id', // The foreign key in the Borrows table
          onDelete: 'CASCADE', // Optional: Cascade delete if user is deleted
        });
  
        // Define association with Books
        Borrows.belongsTo(models.Books, {
          foreignKey: 'book_id', // The foreign key in the Borrows table
          onDelete: 'CASCADE', // Optional: Cascade delete if book is deleted
        });
    }
  }
  Borrows.init(
    {
      borrow_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => uuid.v4(),
      },
      user_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      book_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
      },
      borrow_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Borrows",
      tableName: "Borrows", // Specify the correct table name here
      // Remove the timestamps option
    }
  );
  return Borrows;
};
