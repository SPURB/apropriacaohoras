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

    const usuarioE1234567 = await Usuario.findOne({ // admin de teste
      where: {
        nprodam: 'e1234567'
      }
    })

    const usuarioE7654321 = await Usuario.findOne({ // usuario de teste
      where: {
        nprodam: 'e7654321'
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

    const projetosE1234567 = setInsertObject(usuarioE1234567, projetos)
    const projetosE7654321 = setInsertObject(usuarioE7654321, projetos)

    const toInsert = projetosE059145.concat(
      projetosE059153, 
      projetosE1234567,
      projetosE7654321
    )

    console.log(toInsert)

    toInsert.concat([
      {
        projeto: 1,
        usuario: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        projeto: 1,
        usuario: 4,
        createdAt: now,
        updatedAt: now
      }
    ])

    return queryInterface.bulkInsert('usuarios_projetos', toInsert, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios_projetos', null, {})
  }
}
