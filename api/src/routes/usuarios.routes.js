module.exports = usuario => {
  const usuarios = require('../controllers/usuarios.controller.js')
  const router = require('express').Router()
  router.post('/', usuarios.create)
  router.get('/', usuarios.findAll)
  router.get('/:id', usuarios.findOne)
  router.put('/:id', usuarios.update)
  router.delete('/:id', usuarios.delete)
  usuario.use(`/usuarios`, router)
}
