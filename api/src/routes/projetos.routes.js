module.exports = (projeto, base) => {
  const projetos = require('../controllers/projetos.controller.js')
  const router = require('express').Router()

  // recursos
  router.post('/', projetos.create)
  router.get('/', projetos.findAll)
  router.get('/:id', projetos.findOne)
  router.put('/:id', projetos.update)
  router.delete('/:id', projetos.delete)

  // ações
  /*
  /projetos/:id/acoes/agrupar-horas
  exemplos ->
  http://localhost:5000/projetos/3/acoes/agrupar-horas/2020-05-01/2020-05-31
  http://localhost:5000/projetos/3/acoes/agrupar-horas/2020-05-01/2020-05-31?usuario=4
  http://localhost:5000/projetos/3/acoes/agrupar-horas/2020-05-01/2020-05-31?usuario=4?&subatividade=61
  */
  router.get(
    '/:id/acoes/agrupar-horas/:inicio/:fim',
    projetos.groupHorasProjetos
  )

  projeto.use(`${base}/projetos`, router)
}
