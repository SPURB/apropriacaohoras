module.exports = (subatividade, base) => {
  const subatividades = require('../controllers/subatividades.controller.js')
  const router = require('express').Router()
  router.post('/', subatividades.create)
  router.get('/', subatividades.findAll)
  router.get('/:id', subatividades.findOne)
  router.put('/:id', subatividades.update)
  router.delete('/:id', subatividades.delete)
  subatividade.use(`${base}/subatividades`, router)
}
