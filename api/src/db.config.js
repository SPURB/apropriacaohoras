require('dotenv').config()
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env

module.exports = {
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
