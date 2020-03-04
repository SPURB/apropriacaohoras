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
    projeto: req.body.projeto,
    fase: req.body.fase,
    subatividade: req.body.subatividade,
    descricao: req.body.subatividade
  }

  dao.create(res, Hora, body)
}

exports.findAll = (req, res) => dao.findAll(res, Hora)
exports.findOne = (req, res) => dao.findOne(req, res, Hora)
exports.update = (req, res) => dao.update(req, res, Hora)
exports.delete = (req, res) => dao.delete(req, res, Hora)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Hora)
