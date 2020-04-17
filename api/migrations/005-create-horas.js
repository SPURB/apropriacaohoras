'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('horas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      horas: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      extras: {
        type: Sequelize.INTEGER,
      },
      descricao: {
        type: Sequelize.TEXT,
      },
      usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      projeto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projetos',
          key: 'id'
        }
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
      dataRefInicio: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('horas');
  }
}