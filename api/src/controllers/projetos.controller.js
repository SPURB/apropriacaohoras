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

	else if (!req.admin) {
    res.status(403).send({
      message: 'Usuário não é admin. Apenas admins podem criar projetos'
    })
    return
	}
	
  const body = {
    nome: req.body.nome,
    ativo: 1
  }

  dao.create(req, res, Projeto, body)
}

exports.findAll = (req, res) => dao.findAll(req, res, Projeto, 'Projetos')
exports.findOne = (req, res) => dao.findOne(req, res, Projeto)
exports.update = (req, res) => {
	if (!req.admin) {
    res.status(403).send({
      message: 'Usuário não é admin. Apenas admins podem atualizar projetos'
    })
    return
	}
	dao.update(req, res, Projeto)
}
exports.delete = (req, res) => {
	if (!req.admin) {
    res.status(403).send({
      message: 'Usuário não é admin. Apenas admins podem deletar projetos'
    })
    return
	}
	dao.delete(req, res, Projeto)
}
exports.deleteAll = (req, res) => {
	if (!req.admin) {
    res.status(403).send({
      message: 'Usuário não é admin. Apenas admins podem deletar projetos'
    })
    return
	}
	dao.deleteAll(req, res, Projeto)
}
