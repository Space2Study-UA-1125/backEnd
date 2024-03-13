const User = require('~/models/user')
const users = require('~/consts/users')
const SeedUsers = require('~/seed/seedUsers')
const logger = require('~/logger/logger')

const checkUserExistence = async () => {
  try {
    await Promise.all(
      Object.values(users).map(async (user) => {
        const isUserExist = await User.exists({ email: user.email })

        if (isUserExist) {
          return
        }

        return await SeedUsers.createUser(user)
      })
    )
  } catch (err) {
    logger.error(err)
  }
}

module.exports = checkUserExistence
