const db = require('../models')
const Hora = db.horas
const dao = require('./dao')

exports.create = (req, res) => {
  if (!req.body.horas) {
    res.status(400).send({
      message: `Inclua o objeto 'horas' na requisição`
    })
    return
  }

  Hora.findAll({
    where: {
      usuario: req.body.usuario,
      dataRefInicio: req.body.dataRefInicio
    },
    attributes: ['horas', 'extras']
  }).then(data => {
    let horas = 0
    let extras = 0

    // pega o total de horas e extras registrados no banco para X dia
    data.forEach(dia => {
      horas = horas + dia.horas
      extras = extras + dia.extras
    })

    const sumHoras = req.body.horas + horas
    const sumExtras = req.body.extras + extras

    // verifica se a soma das horas já registradas com as que deseja registrar passar de 8
    if (sumHoras <= 8 && sumExtras <= 4) {
      const body = {
        horas: req.body.horas,
        extras: req.body.extras,
        usuario: req.body.usuario,
        projeto: req.body.projeto,
        fase: req.body.fase,
        subatividade: req.body.subatividade,
        dataRefInicio: req.body.dataRefInicio,
        descricao: req.body.descricao
      }
      dao.create(res, Hora, body)
    } else {
      res.status(400).send({
        message: 'Registro negado! Horas ultrapassaram o limite de 8hr',
        data: req.body.dataRefInicio
      })
      return
    }
  })
}

exports.countHoras = (req, res) => {
  const { id, data } = req.params

  if (data !== null && id !== null) {
    Hora.findAll({
      where: {
        usuario: id,
        dataRefInicio: data
      }
    }).then(r => {
      let totalHoras = 0
      r.forEach(dia => {
        totalHoras = totalHoras + dia.horas + dia.extras
      })
      if (totalHoras == 0) {
        return res.status(200).send({
          type: 'danger',
          totalHoras
        })
      } else if (totalHoras < 8 && totalHoras !== 0) {
        return res.status(200).send({
          type: 'warning',
          totalHoras
        })
      } else {
        return res.status(200).send({
          type: 'success',
          totalHoras
        })
      }
    })
  }
}

exports.findAllWhere = (req, res) => dao.findAllWhere(req, res, Hora)
exports.findAll = (req, res) => dao.findAll(res, 'Hora', Hora)
exports.findOne = (req, res) => dao.findOne(req, res, Hora)
exports.update = (req, res) => dao.update(req, res, Hora)
exports.delete = (req, res) => dao.delete(req, res, Hora)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Hora)
