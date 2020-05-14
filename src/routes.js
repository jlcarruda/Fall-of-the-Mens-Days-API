const { appRules } = require('./rules')
const { isAuthenticated, isAuthorized } = require('./middlewares')

module.exports = app => {
  app.post('/user/auth', (req, res, next) =>
    appRules.signinUser(req.body)
      .then(result => res.status(result.status).json(result))
      .catch(next)
  )

  app.post('/user/signup', (req, res, next) =>
    appRules.signupUser(req.body)
      .then(result => res.status(result.status).json(result))
      .catch(next)
  )
}
