const { appRules, webRules } = require('./rules')
const { isAuthenticated, isAuthorized } = require('./middlewares')

module.exports = app => {
  app.get('/character', isAuthenticated, appRules.createCharacter)

  app.post('/user/signin', appRules.signinUser)
}
