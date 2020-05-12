const Express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const config = require('./config')
const Routes = require('./routes')
const Repository = require('./repository')
const ErrorHandlerMiddleware = require('./error-handler')

async function start () {
  const app = new Express()
  console.log(config)

  await Repository.connect()

  app.use(helmet())
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  Routes(app)

  app.use(ErrorHandlerMiddleware)

  return new Promise(resolve => app.listen(config.PORT, () => resolve(app)))
}

module.exports = start()
