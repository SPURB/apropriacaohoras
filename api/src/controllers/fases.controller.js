const db = require('../models')
const Fase = db.fases
const dao = require('./dao')

exports.create = async (req, res) => {
  if (!req.body.nome) {
    res.status(400).send({
      message: 'Inclua um nome na requisição'
    })
    return
  }
  
  const body = {
    nome: req.body.nome
  }

  dao.create(req, res, Fase, body, 'fase')
}

exports.findAll = (req, res) => dao.findAll(req, res, Fase, 'Fases')
exports.findOne = (req, res) => dao.findOne(req, res, Fase)
exports.update = (req, res) => dao.update(req, res, Fase)
exports.delete = (req, res) => dao.delete(req, res, Fase)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Fase)
