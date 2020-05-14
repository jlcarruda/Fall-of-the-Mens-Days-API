const { User } = require('../../models')
const { encrypt } = require('../../utils')

module.exports = async ({ username, password }) => {
  try {
    const exists = await User.findOne({ username })

    if (exists) return { status: 401 }
    const pwd = await encrypt(password)

    // await User.create({
    //   username,
    //   password: pwd
    // })

    console.log(exists, pwd, username, password)

    return {
      status: 204
    }
  } catch (error) {
    console.error('Error on User Signup: ', error)
    return {
      status: 500
    }
  }
}
