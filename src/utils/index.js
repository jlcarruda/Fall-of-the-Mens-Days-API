const encrypt = require('./encrypt')
const sessionToken = require('./session-token')

module.exports = {
  ...sessionToken,
  encrypt
}