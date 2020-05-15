const { appRules } = require('./rules')
const { isAuthenticated, isAuthorized } = require('./middlewares')

module.exports = (app, { MODELS }) => {
  if (!MODELS) throw new Error('Config file wasnt passed to Router')

  app.post('/user/auth', (req, res, next) =>
    appRules.signinUser(req.body, MODELS)
      .then(result => res.status(result.status).json(result))
      .catch(next)
  )

  app.post('/user/signup', (req, res, next) =>
    appRules.signupUser(req.body, MODELS)
      .then(result => res.status(result.status).json(result))
      .catch(next)
  )
}
