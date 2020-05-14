const config = require('../config')
const { createHmac } = require('crypto')

module.exports = data => createHmac('sha256', config.PASSWORD_SECRET).update(data).digest('hex')
