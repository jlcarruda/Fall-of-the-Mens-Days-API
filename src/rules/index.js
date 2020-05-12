const createCharacter = require('./app/create-character')
const signinUser = require('./app/signin')

module.exports = {
  appRules: {
    createCharacter,
    signinUser
  },
  webRules: {

  }
}
