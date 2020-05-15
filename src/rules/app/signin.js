const { createSessionToken } = require('../../utils')

module.exports = async ({ username, password }, { MODELS, SESSION_SECRET }) => {
  const { User } = MODELS
  try {
    const user = await User.findOne({ username })
    if (!user || user.verifyPassword(password)) return { status: 401 }

    return {
      status: 200,
      data: {
        token: createSessionToken({
          _id: user._id,
          username: user.username
        }, { SESSION_SECRET })
      }
    }
  } catch (error) {
    return {
      status: 401
    }
  }
}
