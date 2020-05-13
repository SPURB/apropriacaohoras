const db = require('../models')
const Hora = db.horas
const dao = require('./dao')

exports.create = (req, res) => {
  if (!req.body.horas) {
    res.status(400).send({
      message: `Inclua o objeto 'horas' na requisição`
    })
    return
  }

  Hora.findAll({
    where: {
      usuario: req.body.usuario,
      dataRefInicio: req.body.dataRefInicio
    },
    attributes: ['horas', 'extras']
  }).then(data => {
    let horas = 0
    let extras = 0

    // pega o total de horas e extras registrados no banco para X dia
    data.forEach(dia => {
      horas = horas + dia.horas
      extras = extras + dia.extras
    })

    const sumHoras = req.body.horas + horas
    const sumExtras = req.body.extras + extras
    const totalHoras = sumHoras + sumExtras

    if (totalHoras <= 12 && sumHoras <= 8 && sumExtras <= 4) {
      const body = {
        horas: req.body.horas,
        extras: req.body.extras,
        usuario: req.body.usuario,
        projeto: req.body.projeto,
        fase: req.body.fase,
        subatividade: req.body.subatividade,
        dataRefInicio: req.body.dataRefInicio,
        descricao: req.body.descricao
      }
      dao.create(req, res, Hora, body)
    } else {
      let data = req.body.dataRefInicio.split('-')
      data = `${data[2]}/${data[1]}/${data[0]}` // formatando data para local
      res.status(400).send({
        message: `Registro negado! Horas ultrapassaram o limite permitido para o dia ${data}`,
        totalHoras,
        data
      })
      return
    }
  })
}

exports.countHoras = (req, res) => {
  const { id, data } = req.params

  if (data !== null && id !== null) {
    Hora.findAll({
      where: {
        usuario: id,
        dataRefInicio: data
      },
      include: [
        { model: db.projetos, attributes: ['id', 'nome'], as: 'id_projeto' },
      ],
      group: ['projeto']
    }).then(r => {
      let totalHoras = 0
      let horas = { projetos: [], total: 0 }
      let extras = { projetos: [], total: 0 }

      r.forEach(dia => {        
        totalHoras = totalHoras + dia.horas + dia.extras
        horas.total = horas.total  + dia.horas
        extras.total  = extras.total + dia.extras

        if (dia.horas > 0) horas.projetos.push({ nome: dia.id_projeto.nome })
        if (dia.extras > 0) extras.projetos.push({ nome: dia.id_projeto.nome })
      })

      if (totalHoras == 0) {
        return res.status(200).send({
          type: 'danger',
          horas,
          extras,
          totalHoras
        })
      } else if (totalHoras < 8 && totalHoras !== 0) {
        return res.status(200).send({
          type: 'warning',
          horas,
          extras,
          totalHoras
        })
      } else {
        return res.status(200).send({
          type: 'success',
          horas,
          extras,
          totalHoras
        })
      }
    })
  }
}

exports.findAllWhere = (req, res) => dao.findAllWhere(req, res, Hora, 'Horas')
exports.findAll = (req, res) => dao.findAll(req, res, Hora)
exports.findOne = (req, res) => dao.findOne(req, res, Hora)
exports.update = (req, res) => dao.update(req, res, Hora)
exports.delete = (req, res) => dao.delete(req, res, Hora)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Hora)
