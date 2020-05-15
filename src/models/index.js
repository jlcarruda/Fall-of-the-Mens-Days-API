const ModelFactory = require('./model-factory')

const modelFactory = new ModelFactory()

const user = require('./blueprints/user')
const character = require('./blueprints/character')
const table = require('./blueprints/table')

module.exports = {
  User: modelFactory.getModel(user),
  Character: modelFactory.getModel(character),
  Table: modelFactory.getModel(table)
}
