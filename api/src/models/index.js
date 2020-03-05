const dbConfig = require('../../config')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV

const sequelize = new Sequelize(
  dbConfig[env].database,
  dbConfig[env].username,
  dbConfig[env].password, {
    host: dbConfig[env].host,
    dialect: dbConfig[env].dialect,
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
db.usuarios_projetos = require('./usuarios-projetos.model.js')(sequelize, Sequelize, db)

db.fases = require('./fases.model.js')(sequelize, Sequelize)
db.subatividades = require('./subatividades.model.js')(sequelize, Sequelize)
db.horas = require('./horas.model.js')(sequelize, Sequelize, db)

module.exports = db
