const Sequelize = require('sequelize')
const { database, username, password, dialect, pool } = require('../db.config')

const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host: process.env.DB_HOST,
    dialect: dialect,
    operatorsAliases: 0,
    pool: {
      max: pool.max,
      min: pool.min,
      acquire: pool.acquire,
      idle: pool.idle
    }
  }
)

const db = {}

db.usuarios = require('./usuarios.model.js')(sequelize, Sequelize)
db.authtokens = require('./authtokens.model.js')(sequelize, Sequelize)
db.projetos = require('./projetos.model.js')(sequelize, Sequelize)
db.usuarios_projetos = require('./usuarios-projetos.model.js')(
  sequelize,
  Sequelize,
  db
)
db.fases = require('./fases.model.js')(sequelize, Sequelize)
db.subatividades = require('./subatividades.model.js')(
  sequelize,
  Sequelize,
  db.fases
)
db.horas = require('./horas.model.js')(sequelize, Sequelize, db)

db.horas.belongsTo(db.projetos, { foreignKey: 'projeto', as: 'id_projeto' })
db.usuarios.associate(db.authtokens)
db.authtokens.associate(db.usuarios)

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
