'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      { name: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'customer', createdAt: new Date(), updatedAt: new Date() },
      { name: 'staff', createdAt: new Date(), updatedAt: new Date() }
    ], {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};