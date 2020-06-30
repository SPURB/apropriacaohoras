module.exports = {
  notAuthorized: (res, message) => res.status(403).send({ message }),
  badRequest: (res, { message, error }) => {
    return res.status(400).send({
      message: message || 'Erro na requisição',
      error: error || 'Erro!'
    })
  },
  internalError: (res, { message, error }) => {
    return res.status(500).send({
      message: message || 'Erro interno',
      error: error || 'Erro!'
    })
  }
}