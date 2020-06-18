const db = require('../models')
const Fase = db.fases
const dao = require('./dao')

exports.create = async (req, res) => {
  if (!req.body.nome || !req.body.grupo) {
    res.status(400).send({
      message: 'Inclua um nome e um grupo na requisição'
    })
    return
  }
  
  const where = {
    nome: req.body.nome,
    grupo: req.body.grupo
  }

  dao.findOrCreate(req, res, Fase, where)
}

exports.findAll = (req, res) => dao.findAll(req, res, Fase, 'Fases')
exports.findOne = (req, res) => dao.findOne(req, res, Fase)
exports.update = (req, res) => dao.update(req, res, Fase)
exports.delete = (req, res) => dao.delete(req, res, Fase)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Fase)
