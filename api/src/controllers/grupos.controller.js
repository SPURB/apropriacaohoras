const db = require('../models')
const Grupo = db.grupos
const dao = require('./dao')

exports.create = async (req, res) => {
  if (!req.body.nome) {
    res.status(400).send({
      message: 'Inclua um nome na requisição'
    })
    return
  }
  
  const where = {
    nome: req.body.nome,
    descricao: req.body.descricao || null
  }

  dao.findOrCreate(req, res, Grupo, where)
}

exports.findAll = (req, res) => dao.findAll(req, res, Grupo, 'Grupos')
exports.findOne = (req, res) => dao.findOne(req, res, Grupo)
exports.update = (req, res) => dao.update(req, res, Grupo)
exports.delete = (req, res) => dao.delete(req, res, Grupo)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Grupo)
