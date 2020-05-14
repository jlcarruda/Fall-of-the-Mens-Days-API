module.exports = ORM => {
  const { ObjectId } = ORM.Schema.Types

  return {
    name: 'Table',
    schema: {
      name: String,
      max_players: Number,
      owner: {
        type: ObjectId,
        ref: 'User'
      },
      players: [{
        user: { type: ObjectId, ref: 'User' },
        character: { type: ObjectId, ref: 'Character' },
        first_entered_at: { type: Date, default: new Date() },
        last_entered_at: { type: Date, default: new Date() }
      }],
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
    methods: [
      {
        name: 'registerPlayer',
        hook: async (user) => {
          const isRegistered = this.players.filter(e => JSON.stringify(e.user) === JSON.stringify(user._id))

          if (isRegistered) {
            return
          }

          this.players.push({
            user: user._id,
            first_entered_at: new Date(),
            last_entered_at: new Date()
          })

          await this.save()
        }
      }
    ]
  }
}
