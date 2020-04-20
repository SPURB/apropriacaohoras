const db = require('../models')
const Usuario = db.usuarios

const dao = require('./dao')
const { hashSync } = require('bcrypt')

const exceptionsDefault = error => {
	return {
		message: error.message || 'Erro na requisição',
		error
	}
}

exports.create = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).send(exceptionsDefault('Ausência de email ou password na body da requisição'))
	}

	const hash = hashSync(req.body.password, 10)

	try {
		let user = await Usuario.create(Object.assign(req.body, { password: hash }))
    let data = await user.authorize()

		return res.json({
			message: 'Usuário criado',
			data
		})

	} catch(err) {
    return res.status(400).send(exceptionsDefault(err))
  }
}

exports.login = async (req, res) => {
	const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send(exceptionsDefault('Ausência de email ou password na body da requisição'))
  }

	try {
    let user = await Usuario.authenticate(email, password)
    return res.json(user)

  } catch (err) {
    return res.status(400).send(exceptionsDefault(err))
  }
}

exports.logout = async (req, res) => {
	const token = req.headers['authorization']

	try {
		if (!req.authorized) {
			return res.status(403).send(exceptionsDefault('Erro no token de autenticação'))
		}
	
		let user = await Usuario.logout(token)
		return res.status(204).send({user})

	} catch (err) {
    return res.status(400).send(exceptionsDefault(err))
	}
}

exports.findAll = (req, res) => {
	return Usuario.findAll()
		.then(usuarios => {
			const usuariosSemDadosSensiveis = usuarios.map(usuario => {
				return  {
					id: usuario.id,
					nprodam: usuario.nprodam
				}
			})
			res.send({
				message: "Usuários cadastrados",
				data: usuariosSemDadosSensiveis
			})
		})
		.catch(err => {
			res.status(500).send(exceptionsDefault('Ocorreu um erro ao encontrar usuários'))
		})
}
exports.findOne = (req, res) => {
	const iduser = req.params.id
	Usuario.findByPk(iduser)
		.then(user => {
			const { id, nprodam } = user
			res.send({
				message: "Usuário",
				id,
				nprodam
			})
		})
		.catch(err => {
			res.status(400).send(exceptionsDefault('Ocorreu um erro ao encontrar usuário'))
		})
}

exports.update = (req, res) => {
	if (!req.authorized) res.status(403).send(exceptionsDefault('Operação não autorizada'))
	dao.update(req, res, Usuario)
}
exports.delete = (req, res) => {
	if (!req.authorized) res.status(403).send(exceptionsDefault('Operação não autorizada'))
	dao.delete(req, res, Usuario)
}
exports.deleteAll = (req, res) => {
	if (!req.authorized) res.status(403).send(exceptionsDefault('Operação não autorizada'))
	dao.deleteAll(req, res, Usuario)
}
