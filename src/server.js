const Express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const Routes = require('./routes')
const Repository = require('./repository')
const ErrorHandlerMiddleware = require('./error-handler')

function getConfig () {
  console.log('No config file passed ... fetching default configurations')
  return require('./config')
}

async function start (conf = getConfig()) {
  const app = new Express()

  await Repository(conf).connect()

  app.use(helmet())
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  Routes(app)

  app.use(ErrorHandlerMiddleware)

  return new Promise(resolve => app.listen(conf.PORT, () => resolve(app)))
}

module.exports = conf => start(conf)
