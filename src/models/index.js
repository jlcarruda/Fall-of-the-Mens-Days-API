const ModelFactory = require('./model-factory')

const modelFactory = new ModelFactory()

const user = require('./blueprints/user')
const character = require('./blueprints/character')

module.exports = {
  User: modelFactory.create(user),
  Character: modelFactory.create(character)
}
