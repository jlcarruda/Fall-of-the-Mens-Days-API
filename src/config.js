const mongoose = require('mongoose')

const config = {
  ORM: mongoose,
  PORT: process.env.PORT,
  DBURL: process.env.DBURL
}

module.exports = config
