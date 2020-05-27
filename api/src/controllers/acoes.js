const db = require('../models')

// GET /projetos/:id/acoes/agrupar-horas
exports.groupHorasProjetos = (req, res) => {
  const Projeto = db.projetos
  res.send(req.params.id)
}