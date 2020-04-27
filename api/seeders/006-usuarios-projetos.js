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

    const rioBranco = await Projeto.findOne({
      where: {
        nome: 'PIU Rio Branco'
      }
    })

    const tiete = await Projeto.findOne({
      where: {
        nome: 'PIU Arco Tietê'
      }
    })

    return queryInterface.bulkInsert(
      'usuarios_projetos',
      [
        {
          projeto: rioBranco.id,
          usuario: usuario.id,
          createdAt: now,
          updatedAt: now
        },
        {
          projeto: tiete.id,
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
