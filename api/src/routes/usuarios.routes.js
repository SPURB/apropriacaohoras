const router = require('express').Router()
const usuarios = require('../controllers/usuarios.controller.js')

module.exports = usuario => {
  router.post('/', usuarios.create) // registro
  router.post('/login', usuarios.login)
  router.delete('/logout', usuarios.logout)
  router.put('/reset', usuarios.resetPassword)

  router.get('/', usuarios.findAll)
  router.get('/:id', usuarios.findOne)
  router.put('/:id', usuarios.update)
  router.delete('/:id', usuarios.delete)
  usuario.use(`/usuarios`, router)
}
