require('dotenv').config()
const FallOfTheMensDayServer = require('./src/server')

FallOfTheMensDayServer.then(() => console.log('Server is UP!'))
