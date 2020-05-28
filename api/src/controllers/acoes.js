import db from '../models'
import sequelize from 'sequelize'
import moment from 'moment'

const self = module.exports = {
  horas: {
    totalPorPeriodo: (inicio, fim) => {
       db.horas.findAll({
        where: {
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
        ],
        include: [
          { model: db.projetos, attributes: ['nome'], as: 'id_projeto' }
        ],
        group: ['projeto']
      })
    }
  },

  projetos: {
  // GET /projetos/:id/acoes/agrupar-horas
  // exemplos ->
  // http://localhost:5000/projetos/3/acoes/agrupar-horas
  // http://localhost:5000/projetos/3/acoes/agrupar-horas?usuario=4
  // http://localhost:5000/projetos/3/acoes/agrupar-horas?usuario=4?&subatividade=61
  // http://localhost:5000/projetos/3/acoes/agrupar-horas?dataRefInicio=2020-05-05
    groupHorasProjetos: (req, res) => {
      const startOfMonth = moment().startOf("month").format("YYYY-MM-DD")
      const endOfMonth = moment().endOf("month").format("YYYY-MM-DD")

      let where = {}

      if (req.query) {
        where = req.query
      }

      where.projeto = req.params.id

      db.horas.findOne({
        where,
        attributes: [
          'id', 
          'projeto',
          [sequelize.fn('sum', sequelize.col('horas')), 'horas'],
          [sequelize.fn('sum', sequelize.col('extras')), 'extras']
        ],
        include: [
          { model: db.projetos, attributes: ['nome'], as: 'id_projeto' }
        ]
      })
      .then(found => {
        found.horas = parseInt(found.horas)
        found.extras = parseInt(found.extras)

        res.send({
          idProjeto: parseInt(req.params.id),
          title: `Horas agrupadas de ${found.id_projeto.nome}`,
          horas: found.horas,
          extras: found.extras,
          total: found.horas + found.extras,
          ultimoMes: self.horas.totalPorPeriodo(startOfMonth, endOfMonth)
        })
      })
      .catch(err => {
        res.status(202).send({
          idProjeto: parseInt(req.params.id),
          title: `Não há horas cadastradas para este projeto`,
          message: err.message || 'Ocorreu um erro na busca',
          horas: 0,
          extras: 0,
          total: 0
        })
      })
    }
  }
}
