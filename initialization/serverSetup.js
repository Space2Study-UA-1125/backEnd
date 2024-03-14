const databaseInitialization = require('~/initialization/database')
const checkUserExistence = require('~/seed/checkUserExistence')
const checkCategoryExistence = require('~/seed/checkCategoryExistence')
const checkUsersExistence = require('~/seed/checkUsersExistence')
const checkSubjectExistence = require('~/seed/checkSubjectExistence')
const checkOfferExistence = require('~/seed/checkOfferExistence')
const checkReviewExistence = require('~/seed/checkReviewExistence')
const initialization = require('~/initialization/initialization')
const logger = require('~/logger/logger')
const {
  config: { SERVER_PORT }
} = require('~/configs/config')
const scheduledCronJobs = require('~/cron-jobs/scheduledCronJobs')

const serverSetup = async (app) => {
  await databaseInitialization()
  await checkUserExistence()
  await checkUsersExistence()
  await checkCategoryExistence()
  await checkSubjectExistence()
  await checkOfferExistence()
  await checkReviewExistence()
  initialization(app)
  return app.listen(SERVER_PORT, () => {
    logger.info(`Server is running on port ${SERVER_PORT}`)
    if (process.env.NODE_ENV !== 'test') {
      scheduledCronJobs()
    }
  })
}

module.exports = serverSetup
