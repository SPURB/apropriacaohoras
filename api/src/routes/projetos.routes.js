module.exports = projeto => {
    const projetos = require('../controllers/projetos.controller.js')
    const router = require('express').Router()
    router.post('/', projetos.create)
    router.get('/', projetos.findAll)
    router.get('/:id', projetos.findOne)
    router.put('/:id', projetos.update)
    router.delete('/:id', projetos.delete)
    projeto.use(`/projetos`, router)
}