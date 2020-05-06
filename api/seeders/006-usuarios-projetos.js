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

    const projetos = await Projeto.findAll()

    const setInsertObject = (usuario, projetos) =>
      projetos.map(projeto => {
        return {
          projeto: projeto.id,
          usuario: usuario.id,
          createdAt: now,
          updatedAt: now
        }
      })

    const projetosE059145 = setInsertObject(usuarioE059145, projetos)
    const projetosE059153 = setInsertObject(usuarioE059153, projetos)

    const toInsert = projetosE059145.concat(projetosE059153)

    return queryInterface.bulkInsert('usuarios_projetos', toInsert, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios_projetos', null, {})
  }
}
