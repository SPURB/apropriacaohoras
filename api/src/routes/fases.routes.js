module.exports = fase => {
  const fases = require('../controllers/fases.controller.js')
  const router = require('express').Router()
  router.post('/', fases.create)
  router.get('/', fases.findAll)
  router.get('/:id', fases.findOne)
  router.put('/:id', fases.update)
  router.delete('/:id', fases.delete)
  fase.use(`/fases`, router)
}
