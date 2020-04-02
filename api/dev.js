require('custom-env').env(true)
require('./src/index.js')

const db = require('./src/models')
db.sequelize.sync()
