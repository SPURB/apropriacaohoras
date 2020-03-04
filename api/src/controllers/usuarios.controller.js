const db = require('../models')
const Usuario = db.usuarios
const dao = require('./dao')

exports.create = (req, res) => {
  if (!req.body.nprodam) {
    res.status(400).send({
      message: 'Inclua o nprodam do usuário na requisição'
    })
    return
  }

  const body = {
    nprodam: req.body.nprodam
  }

  dao.create(res, Usuario, body)
}

exports.findAll = (req, res) => dao.findAll(res, Usuario)
exports.findOne = (req, res) => dao.findOne(req, res, Usuario)
exports.update = (req, res) => dao.update(req, res, Usuario)
exports.delete = (req, res) => dao.delete(req, res, Usuario)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Usuario)
