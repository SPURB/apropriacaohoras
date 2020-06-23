import db from '../models'
import sequelize from 'sequelize'

module.exports = {
  horas: {
    totalPorPeriodo: (inicio, fim, arrayIds) => {
      const { between } = sequelize.Op
      const { horas, projetos } = db
      const arrayHora = []

      arrayIds.map(idProjeto => {
        const projeto = horas.findOne({
          where: {
            projeto: idProjeto,
            dataRefInicio: {
              [between]: [inicio, fim]
            }
          },
          attributes: [
            'id',
            'projeto',
            [sequelize.fn('sum', sequelize.col('horas')), 'horas'],
            [sequelize.fn('sum', sequelize.col('extras')), 'extras'],
            'dataRefInicio'
          ],          
          include: [{ model: projetos, attributes: ['nome'], as: 'id_projeto' }]
        })
        arrayHora.push(projeto)
      })
      return arrayHora
    }
  },

  projetos: {
    somaHoras: where => {
      const { horas } = db
      const projetos = where.projetos // recebe os id de projetos

      // deleta a propriedade do objeto para utilizar só os valores de filtro da query string
      delete where.projetos

      const arrayHoras = []
      projetos.map(id => {
        const projeto = horas.findOne({
          where: {
            ...where,
            projeto: id
          },
          attributes: [
            'id',
            'projeto',
            [sequelize.fn('sum', sequelize.col('horas')), 'horas'],
            [sequelize.fn('sum', sequelize.col('extras')), 'extras']
          ]
        }) 
        arrayHoras.push(projeto)
      })
      return arrayHoras
    }
  }
}
