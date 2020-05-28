module.exports = projeto => {
  const projetos = require('../controllers/projetos.controller.js')
  const acoes = require('../controllers/acoes.js')
  const router = require('express').Router()
  router.post('/', projetos.create)
  router.get('/', projetos.findAll)
  router.get('/:id', projetos.findOne)
  router.put('/:id', projetos.update)
  router.delete('/:id', projetos.delete)

  // ações
  router.get('/:id/acoes/agrupar-horas', acoes.projetos.groupHorasProjetos)

  projeto.use(`/projetos`, router)
}
