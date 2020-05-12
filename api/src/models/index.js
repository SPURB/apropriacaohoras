const dbConfig = require('../db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: process.env.DB_HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
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

db.horas.belongsTo(db.projetos, { foreignKey: 'projeto', as: 'id_projeto',})
db.usuarios.associate(db.authtokens)
db.authtokens.associate(db.usuarios)

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
