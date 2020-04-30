'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fases_subatividades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fase: {
        type: Sequelize.INTEGER,
        references: {
          model: 'fases',
          key: 'id'
        }
      },
      subatividade: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subatividades',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('fases_subatividades')
  }
}
