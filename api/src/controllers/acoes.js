import db from '../models'
import sequelize from 'sequelize'

module.exports = {
  horas: {
    totalPorPeriodo: (inicio, fim, idProjeto) => {
      const { between } = sequelize.Op
      const { horas } = db

      return horas.findOne({
        where: {
          projeto: idProjeto,
          dataRefInicio: {
            [ between ]: [inicio, fim]
          }
        },
        attributes: [
          'id', 
          'projeto',
           [sequelize.fn('sum', sequelize.col('horas')), 'horas'],
           [sequelize.fn('sum', sequelize.col('extras')), 'extras'],
           'dataRefInicio'
        ]
      })
    }
  },

  projetos: {
    somaHoras: (where) => {
      const { horas, projetos } = db

      return horas.findOne({
        where,
        attributes: [
          'id', 
          'projeto',
          [sequelize.fn('sum', sequelize.col('horas')), 'horas'],
          [sequelize.fn('sum', sequelize.col('extras')), 'extras']
        ],
        include: [
          { model: projetos, attributes: ['nome'], as: 'id_projeto' }
        ]
      })
    }
  }
}
