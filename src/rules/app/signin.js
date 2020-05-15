const { encrypt, createSessionToken } = require('../../utils')

module.exports = async ({ username, password }, { User }) => {
  try {
    const user = await User.findOne({ username })

    if (!user || user.password !== encrypt(password)) return { status: 401 }

    return {
      status: 200,
      data: {
        token: createSessionToken({
          _id: user._id,
          username: user.username
        })
      }
    }
  } catch (error) {
    return {
      status: 401
    }
  }
}
