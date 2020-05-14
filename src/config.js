const mongoose = require('mongoose')

const config = {
  ORM: mongoose,
  PORT: process.env.PORT,
  DBURL: process.env.DBURL,
  PASSWORD_SECRET: process.env.PASSWORD_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET
}

module.exports = config
