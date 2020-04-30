import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import middlewares from './middlewares'

const app = express()
const version = `v${require('../package.json').version}`
const endpoints = [
  'horas',
  'usuarios',
  'projetos',
  'fases',
  'subatividades',
	'usuarios-projetos',
]

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(middlewares)

// create endpoints
endpoints.forEach(endpoint =>
  require(`./routes/${endpoint}.routes`)(app, version)
)

// set port, listen for requests
const PORT = process.env.PORT || 5000

//set base url with api title, version and endpoints
app.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.hostname}:${PORT}`
  res.json({
    description: 'API da apropriação de horas',
    version,
    endpoints: endpoints.map(endpoint => `${baseUrl}/${endpoint}`)
  })
})

app.listen(PORT, () => {
  console.log(`Servidor diponível na porta ${PORT}.`)
})
