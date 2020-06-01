const db = require('../models')
const Projeto = db.projetos
const dao = require('./dao')
const { horas, projetos } = require('./acoes')

exports.create = (req, res) => {
  if (!req.body.nome) {
    res.status(400).send({
      message: 'Inclua um nome na requisição'
    })
    return
  } else if (!req.admin) {
    res.status(403).send({
      message: 'Usuário não é admin. Apenas admins podem criar projetos'
    })
    return
  }

  const body = {
    nome: req.body.nome,
    ativo: 1
  }

  dao.create(req, res, Projeto, body, 'projetos')
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

// ações
exports.groupHorasProjetos = (req, res) => {
  const { somaHoras } = projetos
  const { totalPorPeriodo } = horas
  const { inicio, fim } = req.params
  const idProjeto = parseInt(req.params.id)

  let where = {}

  if (req.query) {
    where = req.query
  }

  where.projeto = idProjeto

  Promise.all([somaHoras(where), totalPorPeriodo(inicio, fim, idProjeto)])
    .then(results => {
      const soma = results[0]
      const periodo = results[1]

      const horas = parseInt(soma.horas)
      const extras = parseInt(soma.extras)
      const totalPeriodo = parseInt(periodo.horas) + parseInt(periodo.extras)

      res.send({
        idProjeto,
        title: `Horas agrupadas de ${soma.id_projeto.nome}`,
        horas,
        extras,
        total: horas + extras,
        totalPeriodo
      })
    })
    .catch(err => {
      res.status(203).send({
        idProjeto: parseInt(req.params.id),
        title: `Não há horas cadastradas para este projeto`,
        message: err.message || 'Ocorreu um erro na busca',
        horas: 0,
        extras: 0,
        total: 0,
        totalPeriodo: 0
      })
    })
}
