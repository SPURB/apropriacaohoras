const now = new Date()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'horas',
      [
        {
          horas: 1,
          usuario: 1,
          extras: 0,
          projeto: 1,
          fase: 1,
          subatividade: 1,
          dataRefInicio: now,
          createdAt: now,
          updatedAt: now
        },
        {
          horas: 1,
          usuario: 2,
          extras: 0,
          projeto: 1,
          fase: 1,
          subatividade: 1,
          dataRefInicio: now,
          createdAt: now,
          updatedAt: now
        },
        {
          horas: 1,
          usuario: 3,
          extras: 0,
          projeto: 1,
          fase: 1,
          subatividade: 1,
          dataRefInicio: now,
          createdAt: now,
          updatedAt: now
        },
        {
          horas: 1,
          usuario: 4,
          extras: 0,
          projeto: 1,
          fase: 1,
          subatividade: 1,
          dataRefInicio: now,
          createdAt: now,
          updatedAt: now
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {})
  }
}
