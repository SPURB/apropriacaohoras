module.exports = (sequelize, Sequelize) => {
  const Fase = sequelize.define('fases', {
    nome: {
      type: Sequelize.STRING(128)
    }
  })
  return Fase
}
