module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('fases', [{
      nome: 'teste1',
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(Fase, null, {
      nome: 'teste1'
    })
  }
};
