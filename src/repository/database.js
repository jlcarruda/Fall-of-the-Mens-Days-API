const config = require('../config')

const connectionStates = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconecting'
}

class Database {
  constructor (conf = config) {
    this.config = conf
    this.orm = this.config.ORM

    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      debug: this.config.MONGOOSE_DEBUG === 'true'
    }
  }

  getConnectionState () {
    return connectionStates[this.orm.connection.readyState] || connectionStates[0]
  }

  isConnected () {
    return this.orm.connection.readyState === 1
  }

  connect () {
    return this.orm.connect(this.config.DBURL, this.options)
  }

  disconnect () {
    return this.orm.disconnect(this.config.DBURL)
  }
}

module.exports = Database
