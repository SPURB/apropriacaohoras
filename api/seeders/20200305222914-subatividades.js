const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'subatividades',
      [
        { nome: 'Audiência Pública', createdAt: now, updatedAt: now },
        { nome: 'Reuniões Bilarerais', createdAt: now, updatedAt: now },
        { nome: 'Processo Administrativo', createdAt: now, updatedAt: now }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subatividades', null, {})
  }
}
