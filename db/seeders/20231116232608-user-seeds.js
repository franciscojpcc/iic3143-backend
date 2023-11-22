/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      name: 'Administrador',
      phone: '123456789',
      address: 'DireccionAdmin',
      role: 'admin',
      rut: '12345678-9',
      username: 'admin123',
      password: await bcrypt.hash('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'client@gmail.com',
      name: 'Client',
      phone: '123123123',
      address: 'DireccionUser',
      role: 'client',
      rut: '12312312-3',
      username: 'client123',
      password: await bcrypt.hash('client', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'provider@gmail.com',
      name: 'Provider',
      phone: '111222333',
      address: 'DireccionProvider',
      role: 'provider',
      rut: '87654321-9',
      username: 'Provider123',
      password: await bcrypt.hash('provider', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
