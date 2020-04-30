const models = require('../src/models')
const Usuario = models.usuarios
const Projeto = models.projetos

const now = new Date()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuarioE059145 = await Usuario.findOne({
      where: {
        nprodam: 'e059145'
      }
    })

    const usuarioE059153 = await Usuario.findOne({
      where: {
        nprodam: 'e059153'
      }
    })

    return queryInterface.bulkInsert(
      'usuarios_projetos',
      [
        {
          projeto: 1,
          usuario: usuarioE059145.id,
          createdAt: now,
          updatedAt: now
        },
        {
          projeto: 2,
          usuario: usuarioE059145.id,
          createdAt: now,
          updatedAt: now
        },
        {
          projeto: 1,
          usuario: usuarioE059153.id,
          createdAt: now,
          updatedAt: now
        },
        {
          projeto: 2,
          usuario: usuarioE059153.id,
          createdAt: now,
          updatedAt: now
        },
        {
          projeto: 3,
          usuario: usuarioE059153.id,
          createdAt: now,
          updatedAt: now
        },
        {
          projeto: 4,
          usuario: usuarioE059153.id,
          createdAt: now,
          updatedAt: now
        },
        {
          projeto: 5,
          usuario: usuarioE059153.id,
          createdAt: now,
          updatedAt: now
        }
			],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios_projetos', null, {})
  }
}
