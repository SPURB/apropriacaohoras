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
          horas: 2,
          usuario: 2,
          extras: 0,
          projeto: 2,
          fase: 2,
          subatividade: 2,
          dataRefInicio: now,
          createdAt: now,
          updatedAt: now
        },
        {
          horas: 3,
          usuario: 3,
          extras: 0,
          projeto: 3,
          fase: 3,
          subatividade: 3,
          dataRefInicio: now,
          createdAt: now,
          updatedAt: now
        },
        {
          horas: 4,
          usuario: 4,
          extras: 0,
          projeto: 4,
          fase: 4,
          subatividade: 4,
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
          horas: 2,
          usuario: 3,
          extras: 0,
          projeto: 2,
          fase: 2,
          subatividade: 2,
          dataRefInicio: now,
          createdAt: now,
          updatedAt: now
        },
        {
          horas: 3,
          usuario: 4,
          extras: 0,
          projeto: 3,
          fase: 3,
          subatividade: 3,
          dataRefInicio: now,
          createdAt: now,
          updatedAt: now
        },
        {
          horas: 4,
          usuario: 1,
          extras: 0,
          projeto: 4,
          fase: 4,
          subatividade: 4,
          dataRefInicio: now,
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
