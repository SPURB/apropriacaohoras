module.exports = (sequelize, Sequelize, db) => {
  const FasesSubatividades = sequelize.define('fases_subatividades', {
    fase: {
      type: Sequelize.INTEGER,
      references: {
        model: db.fases,
        key: 'id'
      }
    },
    subatividade: {
      type: Sequelize.INTEGER,
      references: {
        model: db.subatividades,
        key: 'id'
      }
    }
  })
  return FasesSubatividades
}
