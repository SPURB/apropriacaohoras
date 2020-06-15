module.exports = (sequelize, Sequelize, grupos) => {
  const Fase = sequelize.define('fases', {
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
  })
  return Fase
}
