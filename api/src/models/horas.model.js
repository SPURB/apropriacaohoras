module.exports = (sequelize, Sequelize, db) => {
  const Hora = sequelize.define('horas', {
    horas: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    extras: {
      type: Sequelize.INTEGER
    },
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
    },
    dataRefInicio: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    dataRefFim: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    descricao: {
      type: Sequelize.TEXT,
      defaultValue: null
    }
  })
  return Hora
}
