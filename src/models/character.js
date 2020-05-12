
module.exports = ORM => {
  const { ObjectId } = ORM.Schema.Types

  return {
    name: 'Character',
    schema: {
      name: String,
      owner: { type: ObjectId, ref: 'User' },
      created_at: {
        type: Date,
        default: new Date()
      },
      updated_at: {
        type: Date,
        default: new Date()
      }
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
                .populate('owner')
                .execPopulate()
            }
          })
        }
      }
    ]
  }
}
