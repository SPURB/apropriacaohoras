module.exports = (sequelize, Sequelize) => {
  const Projeto = sequelize.define('projetos', {
    nome: {
      type: Sequelize.STRING(128)
    },
    ativo: {
      type: Sequelize.BOOLEAN
    }
  })
  return Projeto
}
