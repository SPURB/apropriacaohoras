module.exports = (sequelize, Sequelize, db) => {
  const UsuarioProjeto = sequelize.define('usuarios_projetos', {
    usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: db.usuarios,
          key: 'id'
        }
      },
      projeto: {
        type: Sequelize.INTEGER,
        references: {
          model: db.projetos,
          key: 'id'
        }
      },
    })
  return UsuarioProjeto
}
