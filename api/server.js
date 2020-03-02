const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const version = `v${require('./package.json').version}`

let corsOptions = {
  origin: 'http://localhost:5001'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./src/models')

db.sequelize.sync()

require('./src/routes/horas.routes')(app, version)

// set port, listen for requests
const PORT = process.env.PORT || 5000

// base
app.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.hostname}:${PORT}`
  res.json({
    message: 'API da apropriação de horas',
    version,
    endpoints: [`${baseUrl}/horas`]
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
