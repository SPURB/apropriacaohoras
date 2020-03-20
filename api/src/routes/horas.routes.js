module.exports = hora => {
  const horas = require('../controllers/horas.controller.js')
  const router = require('express').Router()

  router.post('/', horas.create)
  router.get('/', horas.findAll)
  router.get('/:id', horas.findOne)
  router.put('/:id', horas.update)
  router.delete('/:id', horas.delete)
  router.delete('/', horas.deleteAll)

  router.get('/status/:data', horas.countHoras)

  hora.use(`/horas`, router)
}
