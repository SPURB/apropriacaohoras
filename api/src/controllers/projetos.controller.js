const db = require('../models')
const Projeto = db.projetos
const dao = require('./dao')
const { horas, projetos } = require('./acoes')

exports.create = (req, res) => {
  if (!req.body.nome || !req.body.grupo) {
    res.status(400).send({
      message: 'Inclua um nome e um grupo na requisição'
    })
    return
  } else if (!req.admin) {
    res.status(403).send({
      message: 'Usuário não é admin. Apenas admins podem criar projetos'
    })
    return
  }

  const where = {
    nome: req.body.nome,
    grupo: req.body.grupo,
    ativo: 1
  }

  dao.findOrCreate(req, res, Projeto, where)
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
exports.groupHorasProjetos = async (req, res) => {
  const { somaHoras } = projetos
  const { totalPorPeriodo } = horas
  const { inicio, fim } = req.params
  const ids = JSON.parse(req.params.ids)

  let where = {}

  if (req.query) {
    where = req.query
  }
  
  let arrayHoras = []

  try {
    for (const id of ids) {
      where.projeto = id
      await Promise.all([somaHoras(where), totalPorPeriodo(inicio, fim, id)])
        .then(results => { 
          const soma = results[0]
          const periodo = results[1]

          const horas = parseInt(soma.horas)
          const extras = parseInt(soma.extras)
          const totalPeriodo = parseInt(periodo.horas) + parseInt(periodo.extras)
          
          if (soma.projeto === null) throw new Error('Projeto sem horas')

          arrayHoras.push({
            idProjeto: soma.projeto,
            title: `Horas agrupadas de ${soma.id_projeto.nome}`,
            horas,
            extras,
            total: horas + extras,
            totalPeriodo
          })
        })
        .catch(err => {
          if (err.message === 'Projeto sem horas') {
            arrayHoras.push({
              idProjeto: id,
              title: `Não há horas cadastradas para este projeto`,
              message: err.message || 'Ocorreu um erro na busca',
              horas: 0,
              extras: 0,
              total: 0,
              totalPeriodo: 0
            })
          } else {
            throw new Error(err)
          }
        })
    }
    return res.send(arrayHoras)
  } catch (err) {
    return res.status(400).send({
      message: err.message || 'Ocorreu um erro na busca',
    })
  }
}
