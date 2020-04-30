module.exports = faseSubatividade => {
  const fasesSubatividades = require('../controllers/fases-subatividades.controller.js')
  const router = require('express').Router()
  router.post('/', fasesSubatividades.create)
  router.get('/', fasesSubatividades.findAll)
  router.get('/:id', fasesSubatividades.findOne)
  router.put('/:id', fasesSubatividades.update)
  router.delete('/:id', fasesSubatividades.delete)
  faseSubatividade.use(`/fases-subatividades`, router)
}
