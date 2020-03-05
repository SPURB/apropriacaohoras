const models = require('../src/models')
const Usuario = models.usuarios
const Projeto = models.projetos

const now = new Date()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuario = await Usuario.findOne({
      where: {
        nprodam: 'e059145'
      }
    })

    const projeto = await Projeto.findOne({
      where: {
        nome: 'PIU Rio Branco'
      }
    })

    return queryInterface.bulkInsert(
      'usuarios_projetos',
      [
        {
          projeto: projeto.id,
          usuario: usuario.id,
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
