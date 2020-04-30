const db = require('../models')
const FaseSubatividade = db.fases_subatividades
const dao = require('./dao')

exports.create = (req, res) => {
  if (!req.body.fase || !req.body.subatividade) {
    res.status(400).send({
      message: 'Inclua uma fase e uma subatividade na requisição'
    })
    return
  }

  const body = {
    fase: req.body.fase,
    subatividade: req.body.subatividade
  }

  dao.create(req, res, FaseSubatividade, body)
}

exports.findAll = (req, res) => dao.findAll(req, res, FaseSubatividade, 'Fases/Subatividades')
exports.findOne = (req, res) => dao.findOne(req, res, FaseSubatividade)
exports.update = (req, res) => dao.update(req, res, FaseSubatividade)
exports.delete = (req, res) => dao.delete(req, res, FaseSubatividade)
