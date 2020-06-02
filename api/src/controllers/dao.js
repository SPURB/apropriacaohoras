const dataAccessObject = {
  create: (req, res, Model, body) => {
    if (!req.authorized) {
      return res.status(403).send({ message: 'Erro! Usuário não autorizado' })
    }

    Model.create(body)
      .then(data => res.send(data))
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Ocorreu um erro no registro'
        })
      })
  },
  findOrCreate: (req, res, Model, where) => {
    if (!req.authorized) {
      return res.status(403).send({ message: 'Erro! Usuário não autorizado' })
    }
    Model.findOrCreate({ where })
      .then(data => {
        res.send(data[0])
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Ocorreu um erro no registro'
        })
      })
  },
  findAll: (req, res, Model, title) => {
    let where = {}

    if (req.query) {
      where = req.query
    }

    Model.findAll({ where })
      .then(values => res.send({ values, title }))
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Ocorreu um erro na busca'
        })
      })
  },
  findAllWhere: (req, res, Model) => {
    Model.findAll({
      where: {
        ...req.body
      }
    })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Ocorreu um erro na consulta de id: ${id}`
        })
      })
  },
  findOne: (req, res, Model) => {
    const id = req.params.id

    Model.findByPk(id)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Ocorreu um erro na consulta de id: ${id}`
        })
      })
  },
  update: (req, res, Model) => {
    if (!req.authorized)
      return res.status(403).send({ message: 'Erro! Usuário não autorizado' })
    const id = req.params.id

    Model.update(req.body, { where: { id } })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `Sucesso! id: ${id} foi atualizado`
          })
        } else {
          res.send({
            message: `Erro. Não foi possível atualizar id: ${id}. Verifique se o conteúdo da requisição não está vazio`
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Erro. Não foi possível atualizar id: ${id}`
        })
      })
  },
  delete: (req, res, Model) => {
    if (!req.authorized)
      return res.status(403).send({ message: 'Erro! Usuário não autorizado' })
    const id = req.params.id

    Model.destroy({ where: { id } })
      .then(num => {
        if (num) {
          res.send({
            message: `Sucesso! id: ${id} foi deletado`
          })
        } else {
          res.send({
            message: `Erro. Não foi possível deletar id: ${id}. Talvez ${id} não tenha sido enconcontrada`
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Erro. Não foi possível deletar id: ${id}`
        })
      })
  },
  deleteAll: (req, res, Model) => {
    if (!req.authorized)
      return res.status(403).send({ message: 'Erro! Usuário não autorizado' })
    Model.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Sucesso! Todos os itens foram deletados` })
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Erro. Algum erro ocorreu durante a deleção'
        })
      })
  }
}

module.exports = dataAccessObject
