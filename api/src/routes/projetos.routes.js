module.exports = projeto => {
  const projetos = require('../controllers/projetos.controller.js')
  const router = require('express').Router()
  router.post('/', projetos.create)
  router.get('/', projetos.findAll)
  router.get('/:id', projetos.findOne)
  router.put('/:id', projetos.update)
  router.delete('/:id', projetos.delete)

// ações
// GET /projetos/:id/acoes/agrupar-horas
// exemplos ->
// http://localhost:5000/projetos/3/acoes/agrupar-horas
// http://localhost:5000/projetos/3/acoes/agrupar-horas?usuario=4
// http://localhost:5000/projetos/3/acoes/agrupar-horas?usuario=4?&subatividade=61
// http://localhost:5000/projetos/3/acoes/agrupar-horas?dataRefInicio=2020-05-05
  router.get('/:id/acoes/agrupar-horas', projetos.groupHorasProjetos)

  projeto.use(`/projetos`, router)
}
