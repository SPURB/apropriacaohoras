const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'usuarios',
      [
        { nprodam: 'e059145', createdAt: now, updatedAt: now },
        { nprodam: 'X490849', createdAt: now, updatedAt: now },
        { nprodam: 'e059153', createdAt: now, updatedAt: now }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {})
  }
}
