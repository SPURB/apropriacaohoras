const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nprodam: 'e059145',
          email: 'tlyuba@spurbanismo.sp.gov.br',
          password:
            '$2b$10$4P9ofTvzLRHdVAtWJr4dAunskgYIgT1QAXePqIWKvL0P7IzhdZX0u', // 123456
          createdAt: now,
          updatedAt: now
        },
        {
          nprodam: 'X490849',
          email: 'mauriciodantas@spurbanismo.sp.gov.br',
          password:
            '$2b$10$4P9ofTvzLRHdVAtWJr4dAunskgYIgT1QAXePqIWKvL0P7IzhdZX0u', // 123456
          createdAt: now,
          updatedAt: now
        },
        {
          nprodam: 'e059153',
          email: 'mgiannoni@spurbanismo.sp.gov.br',
          password:
            '$2b$10$4P9ofTvzLRHdVAtWJr4dAunskgYIgT1QAXePqIWKvL0P7IzhdZX0u', // 123456
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {})
  }
}
