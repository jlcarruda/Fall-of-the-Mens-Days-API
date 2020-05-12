const ModelFactory = require('./model-factory')

const modelFactory = new ModelFactory()

const User = require('./user')
const Character = require('./character')

module.exports = {
  User: modelFactory.create(User),
  Character: modelFactory.create(Character)
}
