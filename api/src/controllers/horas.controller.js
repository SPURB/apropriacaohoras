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
}

exports.countHoras = (req, res) => {
  const { data } = req.params
  if (data !== null) {
    Hora.findAll({
      where: {
        dataRefInicio: data
      }
    }).then(r => {
      let total_horas = 0
      r.forEach(dia => {
        total_horas = total_horas + dia.horas + dia.extras
      })
      if (total_horas == 0) {
        return res.status(200).send({
          type: 'danger',
          total_horas
        })
      } else if (total_horas < 8 && total_horas !== 0) {
        return res.status(200).send({
          type: 'warning',
          total_horas
        })
      } else {
        return res.status(200).send({
          type: 'success',
          total_horas
        })
      }
    })
  }
}

exports.findAll = (req, res) => dao.findAll(res, 'Hora', Hora)
exports.findOne = (req, res) => dao.findOne(req, res, Hora)
exports.update = (req, res) => dao.update(req, res, Hora)
exports.delete = (req, res) => dao.delete(req, res, Hora)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Hora)
