'use strict';

const { passwordHash } = require("../../library/data-encryption");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [
        {
          username: 'amar',
          password: passwordHash("12345678"),
          photo: "amar.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          username: 'akbar',
          password: passwordHash("12345678"),
          photo: "akbar.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          username: 'anthony',
          password: passwordHash("12345678"),
          photo: "anthony.jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
