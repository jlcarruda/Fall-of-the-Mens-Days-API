function isAuthorized (req, res, next) {
  next()
}

function isAuthenticated (req, res, next) {
  next()
}

module.exports = {
  isAuthorized,
  isAuthenticated
}
