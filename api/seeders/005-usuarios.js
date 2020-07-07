const now = new Date()
const { hashSync } = require('bcryptjs')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nprodam: 'e059145',
          email: 'tlyuba@spurbanismo.sp.gov.br',
          nome: 'THOMAS LEN YUBA',
          admin: true,
          password:
            '$2b$10$4P9ofTvzLRHdVAtWJr4dAunskgYIgT1QAXePqIWKvL0P7IzhdZX0u', // 123456
          createdAt: now,
          updatedAt: now
        },
        {
          nprodam: 'X490849',
          email: 'mauriciodantas@spurbanismo.sp.gov.br',
          nome: 'MAURÍCIO DANTAS',
          admin: true,
          password:
            '$2b$10$4P9ofTvzLRHdVAtWJr4dAunskgYIgT1QAXePqIWKvL0P7IzhdZX0u', // 123456
          createdAt: now,
          updatedAt: now
        },
        {
          nprodam: 'e059153',
          admin: true,
          email: 'mgiannoni@spurbanismo.sp.gov.br',
          nome: 'MELINA GIANNONNI',
          password:
            '$2b$10$4P9ofTvzLRHdVAtWJr4dAunskgYIgT1QAXePqIWKvL0P7IzhdZX0u', // 123456
          createdAt: now,
          updatedAt: now
        },
        {
          nprodam: 'e0545454',
          admin: false,
          email: 'jsilva@spurbanismo.sp.gov.br',
          nome: 'JOÃO DA SILVA',
          password:
            '$2b$10$4P9ofTvzLRHdVAtWJr4dAunskgYIgT1QAXePqIWKvL0P7IzhdZX0u', // 123456
          createdAt: now,
          updatedAt: now
        },
        {
          nprodam: 'e1234567',
          admin: true,
          email: 'admin@spurbanismo.sp.gov.br',
          nome: 'ADMIN TESTE',
          password:
            '$2b$10$4P9ofTvzLRHdVAtWJr4dAunskgYIgT1QAXePqIWKvL0P7IzhdZX0u', // 123456
          createdAt: now,
          updatedAt: now
        },
        {
          nprodam: 'e7654321',
          admin: false,
          email: 'usuario@spurbanismo.sp.gov.br',
          nome: 'USUÁRIO TESTE',
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
