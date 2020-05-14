const mongoose = require('mongoose')

const config = {
  ORM: mongoose,
  PORT: process.env.PORT,
  DBURL: process.env.DBURL,
  SECRET_PASSWORD: process.env.PASSWORD_SECRET
}

module.exports = config
