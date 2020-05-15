const { encrypt, createSessionToken } = require('../../utils')

module.exports = async ({ username, password }, { User }, config) => {
  try {
    const exists = await User.findOne({ username })

    if (exists) return { status: 401 }
    const pwd = await encrypt(password)

    const user = await User.create({
      username,
      password: pwd
    })

    return {
      status: 201,
      data: {
        token: createSessionToken({
          _id: user._id,
          username: user.username
        }, config)
      }
    }
  } catch (error) {
    console.error('Error on User Signup: ', error)
    return {
      status: 500
    }
  }
}
