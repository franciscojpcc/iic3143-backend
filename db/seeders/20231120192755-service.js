/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Services', [{
      name: 'Servicio 1',
      description: 'Descripcion 1',
      fee: 1000,
      category: 'Categoria 1',
      qualification: 5,
      supplierId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Services', null, {});
  },
};
