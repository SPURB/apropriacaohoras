const db = require('../models')
const Hora = db.horas
const Op = db.Sequelize.Op

// Create and Save a new Hora
exports.create = (req, res) => {
  // Validate request
  if (!req.body.horas) {
    res.status(400).send({
      message: 'Content can not be empty asd!'
    })
    return
  }

  // Create a Hora
  const hora = {
    horas: req.body.horas,
    extras: req.body.extras,
    projeto: req.body.projeto,
    fase: req.body.fase,
    subatividade: req.body.subatividade
  }

  // Save Hora in the database
  Hora.create(hora)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Hora.'
      })
    })
}

// Retrieve all Horas from the database.
exports.findAll = (req, res) => {
  const hora = req.query.hora
  var condition = hora ? { hora: { [Op.like]: `%${hora}%` } } : null

  Hora.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving horas.'
      })
    })
}

// Find a single Hora with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Hora.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Hora with id=' + id
      })
    })
}

// Update a Hora by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Hora.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Hora was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Hora with id=${id}. Maybe hora was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Hora with id=' + id
      })
    })
}

// Delete a Hora with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Hora.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Hora was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Hora with id=${id}. Maybe Hora was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Hora with id=' + id
      })
    })
}

// Delete all Horas from the database.
exports.deleteAll = (req, res) => {
  Hora.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Horas were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all tutorials.'
      })
    })
}
