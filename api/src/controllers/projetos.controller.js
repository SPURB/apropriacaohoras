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
  const idProjeto = JSON.parse(req.params.id)

  let where = {}

  if (req.query) {
    where = req.query
  }

  where.projetos = idProjeto
  
  let arrayHoras = []

  try {
    const countForPeriod = await Promise.all(totalPorPeriodo(inicio, fim, idProjeto))
    const countHours = await Promise.all(somaHoras(where))

    countForPeriod.map((periodo, index) => {
      const soma = countHours[index]
      let horas = 0
      let extras = 0
      const totalPeriodo = parseInt(periodo.horas) + parseInt(periodo.extras)

      if (soma.id !== null) {
        horas = parseInt(soma.horas)
        extras = parseInt(soma.extras)
      } else {
        horas = 0
        extras = 0
      }

      arrayHoras.push({
        id: periodo.projeto,
        title: `Horas agrupadas de ${periodo.id_projeto.nome}`,
        horas,
        extras,
        total: horas + extras,
        totalPeriodo
      })
    })
    return res.send(arrayHoras)
  } catch (err) {
    res.status(203).send({
      title: `Não há horas cadastradas para estes projetos`,
      message: err.message || 'Ocorreu um erro na busca',
    })
  }
}
