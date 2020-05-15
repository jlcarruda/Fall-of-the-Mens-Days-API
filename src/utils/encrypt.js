const { createHmac } = require('crypto')
const config = require('../config')

module.exports = (data, conf = config) => createHmac('sha256', conf.PASSWORD_SECRET).update(data).digest('hex')
