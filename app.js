require('dotenv').config()
const config = require('./src/config')
const FallOfTheMensDayServer = require('./src/server')

FallOfTheMensDayServer(config).then(() => console.log('Server is UP!'))
