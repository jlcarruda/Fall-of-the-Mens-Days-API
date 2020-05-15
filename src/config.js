const mongoose = require('mongoose')

const config = {
  ORM: mongoose,
  MODELS: require('./models'),
  PORT: process.env.PORT,
  DBURL: process.env.DBURL,
  PASSWORD_SECRET: process.env.PASSWORD_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET
}

module.exports = config

// if (process.env.NODE_ENV === 'test') {
//   module.exports.inject = (key, value) => {
//     config[key] = value
//     return config
//   }
// }
