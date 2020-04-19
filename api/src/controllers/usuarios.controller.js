const db = require('../models')
const Usuario = db.usuarios

const dao = require('./dao')
const bcrypt = require('bcrypt')

exports.create = async (req, res) => {
	const hash = bcrypt.hashSync(req.body.password, 10)

	try {
		let user = await Usuario.create(Object.assign(req.body, { password: hash }))
    let data = await user.authorize()

		return res.json({
			message: 'Usuário criado',
			data
		})

	} catch(err) {
    return res.status(400).send({
			message: err.message || "Erro ao cadastrar usuário",
			err
		})
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
			res.send(usuariosSemDadosSensiveis)
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Ocorreu um erro ao encontrar usuários"
			})
		})
}
exports.findOne = (req, res) => dao.findOne(req, res, Usuario)
exports.update = (req, res) => dao.update(req, res, Usuario)
exports.delete = (req, res) => dao.delete(req, res, Usuario)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, Usuario)
