const config = require('../config')
const { createHmac } = require('crypto')

module.exports = data => createHmac('sha256', config.SECRET_PASSWORD).update(data).digest('hex')
