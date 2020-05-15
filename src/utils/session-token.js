const jwt = require('jsonwebtoken')
const config = require('../config')

const createSessionToken = (data, conf = config) => {
  return jwt.sign({
    data
  }, conf.SESSION_SECRET, { expiresIn: '7d' })
}

const verifySessionToken = (token, conf = config) => {
  try {
    return jwt.verify(token, conf.SESSION_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = {
  createSessionToken,
  verifySessionToken
}
