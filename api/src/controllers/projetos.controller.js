const db = require('../models')
const Projeto = db.projetos
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
    ativo: 1
  }

  dao.create(res, Projeto, body)
}

exports.findAll = (req, res) => dao.findAll(res, 'Projeto', Projeto)
exports.findOne = (req, res) => dao.findOne(req, res, Projeto)
exports.update = (req, res) => {
  dao.update(req, res, Projeto)
}
exports.delete = (req, res) => dao.delete(req, res, Projeto)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Projeto)
