module.exports = (sequelize, Sequelize) => {
  const Subatividade = sequelize.define('subatividades', {
    nome: {
      type: Sequelize.STRING(128)
    }
  })
  return Subatividade
}
