import mysqldump from 'mysqldump'
require('dotenv').config()

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env
const now = new Date().valueOf()
const dumpToFile = `./dump.${DB_NAME}.${now}.sql.gz`

mysqldump({
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
  },
  dumpToFile,
  compressFile: true,
})
