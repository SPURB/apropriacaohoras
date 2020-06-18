module.exports = (grupo, base) => {
  const grupos = require('../controllers/grupos.controller.js')
  const router = require('express').Router()
  router.post('/', grupos.create)
  router.get('/', grupos.findAll)
  router.get('/:id', grupos.findOne)
  router.put('/:id', grupos.update)
  router.delete('/:id', grupos.delete)
  grupo.use(`${base}/grupos`, router)
}
