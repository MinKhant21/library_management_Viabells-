'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Borrows', {
      borrow_id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: () => uuid.v4(),
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER, 
        allowNull: false,
      },
      book_id: {
        type: Sequelize.DataTypes.INTEGER, 
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue : "0"
      },
      borrow_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
