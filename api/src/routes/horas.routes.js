module.exports = (hora, version) => {
  const horas = require('../controllers/horas.controller.js')

  let router = require('express').Router()

  // Create a new Hora
  router.post('/', horas.create)

  // Retrieve all Hora
  router.get('/', horas.findAll)

  // Retrieve a single Hora with id
  router.get('/:id', horas.findOne)

  // Update a Hora with id
  router.put('/:id', horas.update)

  // Delete a Hora with id
  router.delete('/:id', horas.delete)

  // Create a new Hora
  router.delete('/', horas.deleteAll)

  hora.use(`/horas`, router)
}
