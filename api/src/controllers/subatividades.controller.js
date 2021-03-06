const db = require('../models')
const Subatividade = db.subatividades
const dao = require('./dao')

exports.create = (req, res) => {
  if (!req.body.nome || !req.body.fase) {
    res.status(400).send({
      message: 'Inclua um nome e/ou fase na requisição'
    })
    return
  }

  const where = {
    nome: req.body.nome,
    fase: req.body.fase
  }

  dao.findOrCreate(req, res, Subatividade, where)
}

exports.findAll = (req, res) =>
  dao.findAll(req, res, Subatividade, 'Subatividades')
exports.findOne = (req, res) => dao.findOne(req, res, Subatividade)
exports.update = (req, res) => dao.update(req, res, Subatividade)
exports.delete = (req, res) => dao.delete(req, res, Subatividade)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Subatividade)
