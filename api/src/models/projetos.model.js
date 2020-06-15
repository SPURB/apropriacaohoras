module.exports = (sequelize, Sequelize, grupos) => {
  const Projeto = sequelize.define('projetos', {
    nome: {
      type: Sequelize.STRING(128)
    },
    grupo: {
      type: Sequelize.INTEGER,
      references: {
        model: grupos,
        key: 'id'
      }
    },
    ativo: {
      type: Sequelize.BOOLEAN
    }
  })
  return Projeto
}
