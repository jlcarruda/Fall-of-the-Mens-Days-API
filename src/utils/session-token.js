const jwt = require('jsonwebtoken')
const config = require('../config')

const createSessionToken = data => {
  return jwt.sign({
    data
  }, config.SESSION_SECRET, { expiresIn: '7d' })
}

const verifySessionToken = token => {
  try {
    return jwt.verify(token, config.SESSION_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = {
  createSessionToken,
  verifySessionToken
}