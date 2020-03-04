const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.usuarios = require('./usuarios.model.js')(sequelize, Sequelize)
db.projetos = require('./projetos.model.js')(sequelize, Sequelize)
db.fases = require('./fases.model.js')(sequelize, Sequelize)
db.subatividades = require('./subatividades.model.js')(sequelize, Sequelize)
db.horas = require('./horas.model.js')(sequelize, Sequelize, db)

module.exports = db
