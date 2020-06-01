const db = require('../models')
const Subatividade = db.subatividades
const dao = require('./dao')

exports.create = (req, res) => {
  if (!req.body.nome) {
    res.status(400).send({
      message: 'Inclua um nome na requisição'
    })
    return
  }

  const body = {
    nome: req.body.nome,
    fase: req.body.fase
  }

  dao.create(req, res, Subatividade, body, 'subatividades')
}

exports.findAll = (req, res) =>
  dao.findAll(req, res, Subatividade, 'Subatividades')
exports.findOne = (req, res) => dao.findOne(req, res, Subatividade)
exports.update = (req, res) => dao.update(req, res, Subatividade)
exports.delete = (req, res) => dao.delete(req, res, Subatividade)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Subatividade)
