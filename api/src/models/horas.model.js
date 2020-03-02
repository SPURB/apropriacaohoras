module.exports = (sequelize, Sequelize) => {
  const Hora = sequelize.define('horas', {
    horas: {
      type: Sequelize.INTEGER
    },
    extras: {
      type: Sequelize.INTEGER
    },
    projeto: {
      type: Sequelize.INTEGER
    },
    fase: {
      type: Sequelize.INTEGER
    },
    subatividade: {
      type: Sequelize.INTEGER
    },
    dataRefInicio: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    dataRefFim: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  })
  return Hora
}
