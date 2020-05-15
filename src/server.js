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

async function start (config = getConfig()) {
  const app = new Express()

  await Repository(config).connect()

  app.use(helmet())
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  Routes(app, config)

  app.use(ErrorHandlerMiddleware)

  return new Promise(resolve => app.listen(config.PORT, () => resolve(app)))
}

module.exports = config => start(config)
