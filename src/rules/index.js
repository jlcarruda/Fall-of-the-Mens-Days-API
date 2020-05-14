const createCharacter = require('./app/create-character')
const signinUser = require('./app/signin')
const signupUser = require('./app/signup')

module.exports = {
  appRules: {
    createCharacter,
    signinUser,
    signupUser
  },
  webRules: {

  }
}
