"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Books.belongsTo(models.Category, {
        foreignKey: "category_id",
        onDelete: "CASCADE",
      });
      // Define association with Borrows
      Books.hasMany(models.Borrows, {
        foreignKey: "book_id", // The foreign key in the Borrows table
      });
    }
  }
  Books.init(
    {
      book_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => uuid.v4(),
      },
      category_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
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
    },
    {
      sequelize,
      modelName: "Books",
      tableName: "Books", // Specify the correct table name here
      // Remove the timestamps option
    }
  );
  return Books;
};
