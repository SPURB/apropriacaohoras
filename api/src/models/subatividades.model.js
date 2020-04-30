module.exports = (sequelize, Sequelize, fases) => {
  const Subatividade = sequelize.define('subatividades', {
    nome: {
      type: Sequelize.STRING(128)
    },
    fase: {
      type: Sequelize.INTEGER,
      references: {
        model: fases,
        key: 'id'
      }
    }
  })
  return Subatividade
}
