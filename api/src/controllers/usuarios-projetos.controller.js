const db = require('../models')
const UsuarioProjeto = db.usuarios_projetos
const dao = require('./dao')

exports.create = (req, res) => {
  if (!req.body.projeto || !req.body.usuario) {
    res.status(400).send({
      message: 'Inclua o usuario e o projeto na requisição'
    })
    return
  }

  const body = {
    projeto: req.body.projeto,
    usuario: req.body.usuario
  }

  dao.create(req, res, UsuarioProjeto, body)
}

exports.findAll = (req, res) => {
  const title = 'Usuarios/Projetos'

  if (req.query) {
    return dao.findAll(res, title, UsuarioProjeto, {
      where: req.query
    })
  }
  return dao.findAll(res, title, UsuarioProjeto)
}
exports.findOne = (req, res) => dao.findOne(req, res, UsuarioProjeto)
exports.update = (req, res) => dao.update(req, res, UsuarioProjeto)
exports.delete = (req, res) => dao.delete(req, res, UsuarioProjeto)
