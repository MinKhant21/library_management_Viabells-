'use strict';
const uuid = require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Category', [{
      category_id : uuid.v4(),
      name: 'Horror',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category_id : uuid.v4(),
      name: 'Adventure',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category_id : uuid.v4(),
      name: 'Romance',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
