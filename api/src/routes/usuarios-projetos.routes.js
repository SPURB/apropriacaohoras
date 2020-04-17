module.exports = usuarioProjeto => {
  const usuariosProjetos = require('../controllers/usuarios-projetos.controller.js')
  const router = require('express').Router()
  router.post('/', usuariosProjetos.create)
  router.get('/', usuariosProjetos.findAll)
  router.get('/:id', usuariosProjetos.findOne)
  router.put('/:id', usuariosProjetos.update)
  router.delete('/:id', usuariosProjetos.delete)
  usuarioProjeto.use(`/usuarios-projetos`, router)
}
