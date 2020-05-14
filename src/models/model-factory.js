const config = require('../config')

class MongoDbModel {
  constructor (ORM = null, conf = config) {
    this.config = conf
    this.orm = ORM || this.config.ORM

    this.schema = null
  }

  validateSchemaPresence(detail) {
    if (!this.schema) throw new Error(`Schema not set on ${detail}`)
  }
  getSchema () {
    return this.schema
  }

  setSchema (schemaObj) {
    this.schema = new this.orm.Schema(schemaObj)
    return this.getSchema()
  }

  setSchemaPreHooks (hookArray) {
    this.validateSchemaPresence("preHook")
    if(!hookArray) return

    hookArray.map(e => {
      this.schema.pre(e.type, e.hook)
    })
  }

  setSchemaPostHooks (hookArray) {
    this.validateSchemaPresence("postHook")
    if(!hookArray) return

    hookArray.map(e => {
      this.schema.post(e.type, e.hook)
    })
  }

  setSchemaMethods (methodsArray) {
    this.validateSchemaPresence("methods")
    if(!methodsArray) return

    methodsArray.map(e => {
      this.schema.methods[e.name] = e.hook
    })
  }

  setSchemaStatics (staticsArray) {
    this.validateSchemaPresence("statics")
    if(!staticsArray) return

    staticsArray.map(e => {
      this.schema.methods[e.name] = e.hook
    })
  }
}

class MongoDbModelFactory {
  constructor (ORM = null, conf = config) {
    this.config = conf
    this.orm = ORM || this.config.ORM
  }

  commitModel (name, model) {
    if (!name || !model) throw new Error(`Model ${!name ? "name" : "object" } is not specified`)

    return this.orm.models[name] ?? this.orm.model(name, model.getSchema())
  }

  create (modelBlueprint) {
    const { name, schema, preHooks, postHooks, methods, statics } = modelBlueprint(this.orm)
    try {
      let model = new MongoDbModel(this.orm, this.config)
      model.setSchema(schema)
      model.setSchemaPreHooks(preHooks)
      model.setSchemaPostHooks(postHooks)
      model.setSchemaMethods(methods)
      model.setSchemaStatics(statics)

      console.log(`Commiting model ${name} ...`)
      return this.commitModel(name, model)
    } catch (error) {
      console.error(`Error while creating Model: ${name} \n${error}`)
    }
  }
}

module.exports = MongoDbModelFactory
