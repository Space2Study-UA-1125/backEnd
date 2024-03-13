const User = require('~/models/user')
const logger = require('~/logger/logger')

const SeedUser = {
  createUser: async (user) => {
    try {
      return await User.create(user)
    } catch (err) {
      logger.error(err)
    }
  }
}

module.exports = SeedUser
