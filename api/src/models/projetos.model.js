module.exports = (sequelize, Sequelize) => {
  const Projeto = sequelize.define('projetos', {
    nome: {
      type: Sequelize.STRING(128)
    }
  })
  return Projeto
}
