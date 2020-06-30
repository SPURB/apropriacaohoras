const db = require('../models')
const Usuario = db.usuarios
const dao = require('./dao')

import { generate } from 'generate-password'
import { hashSync } from 'bcrypt'
import { notAuthorized, badRequest, internalError } from './exceptions'
import { enviarEmail, usuarios } from './acoes'

exports.create = (req, res) => {
  if (!req.admin) {
    return notAuthorized(res, 'Usuário não autorizado')
  }

  const { email, nprodam, nome } = req.body

  if (!email || !nprodam || !nome ) {
    return badRequest(res, { message: 'Ausência de email, password na body da requisição' })
  }

  const password = generate({
    length: 18,
    numbers: true,
    uppercase: false
  })

  const hash = hashSync(password, 10)
  const emailBody = usuarios.criarMensagem(nome, email, password)

  enviarEmail(email, 'Registro de horas | São Paulo Urbanismo', emailBody)
    .then(async () => {
      try {
        const user = await Usuario.create(Object.assign(req.body, { password: hash }))
        await user.authorize()
      } catch(err) {
        return badRequest(res, {
          error: err,
          message: 'Erro de requisição'
        })
      }

      return res.json({
        message: `Usuário criado. Solicitação de acesso enviado para ${email}`,
      })
    })
    .catch(err => {
      return internalError(res, {
        error: err,
        message: 'Erro no envio'
      })
    })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return notAuthorized(res, 'Ausência de email ou password na body da requisição')
  }

  try {
    let user = await Usuario.authenticate(email, password)
    return res.json(user)
  } catch (err) {
    return badRequest(res, {
      error: err,
      message: 'Erro de autenticação'
    })
  }
}

exports.logout = async (req, res) => {
  const token = req.headers['authorization']

  try {
    if (!req.authorized) {
      return notAuthorized(res, 'Erro no token de autenticação')
    }

    let user = await Usuario.logout(token)
    return res.status(204).send({ user })
  } catch (err) {
    return badRequest(res, {
      error: err,
      message: 'Erro ao realizar logout'
    })
  }
}

exports.findAll = (req, res) => {
  return Usuario.findAll()
    .then(usuarios => {
      const usuariosSemDadosSensiveis = usuarios.map(usuario => {
        return {
          id: usuario.id,
          nprodam: usuario.nprodam,
          nome: usuario.nome
        }
      })
      res.send({
        message: 'Usuários cadastrados',
        data: usuariosSemDadosSensiveis
      })
    })
    .catch(err => {
      return internalError(res, {
        error: err,
        message: 'Ocorreu um erro ao encontrar usuários'
      })
    })
}
exports.findOne = (req, res) => {
  const iduser = req.params.id
  Usuario.findByPk(iduser)
    .then(user => {
      const { id, nprodam, nome } = user
      res.send({
        message: 'Usuário',
        id,
        nprodam,
        nome
      })
    })
    .catch(err => {
      return badRequest(res, {
        error: err,
        message: 'Ocorreu um erro ao encontrar usuário'
      })
    })
}

exports.update = (req, res) => {
  if (!req.authorized) {
    return notAuthorized(res, 'Atualização não autorizada. Usuário não autorizado')
  } else if (req.body.password) {
    req.body.password = hashSync(req.body.password, 10)
    dao.update(req, res, Usuario)
  } else {
    dao.update(req, res, Usuario)
  }
}
exports.delete = (req, res) => {
  if (!req.authorized)
  return notAuthorized(res, 'Atualização não autorizada. Usuário não autorizado')
  dao.delete(req, res, Usuario)
}
exports.deleteAll = (req, res) => {
  if (!req.authorized)
  return notAuthorized(res, 'Atualização não autorizada. Usuário não autorizado')
  dao.deleteAll(req, res, Usuario)
}
