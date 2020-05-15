const { encrypt } = require('../../utils')

module.exports = (ORM, config) => {
  const { ObjectId } = ORM.Schema.Types

  return {
    name: 'User',
    schema: {
      password: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      created_at: {
        type: Date,
        default: new Date()
      },
      updated_at: {
        type: Date,
        default: new Date()
      },
      characters: [{ type: ObjectId, ref: 'Character' }],
      tables_participating: [{ type: ObjectId, ref: 'Table' }],
      tables_owned: [{ type: ObjectId, ref: 'Table' }]
    },
    preHooks: [
      {
        type: 'save',
        hook: next => {
          this.updated_at = new Date()
          next()
        }
      }
    ],
    postHooks: [
      {
        type: 'find',
        hook: docs => {
          docs.map(async doc => {
            if (doc.isPublic) {
              await doc
                .populate('characters')
                .populate('tables_participating')
                .populate('tables_owned')
                .execPopulate()
            }
          })
        }
      }
    ],
    methods: [
      {
        name: 'verifyPassword',
        hook: function (pass) {
          return encrypt(pass, config) === this.password
        }
      }
    ]
  }
}
