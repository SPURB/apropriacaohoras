module.exports = (sequelize, Sequelize) => {
  const Fase = sequelize.define('grupos', {
    nome: {
      type: Sequelize.STRING(256)
    },
    descricao: {
      type: Sequelize.STRING(512)
    }
  })
  return Fase
}
