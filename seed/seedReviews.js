const Review = require('~/models/review')
const logger = require('~/logger/logger')

const SeedReviews = {
  createReview: async (review) => {
    try {
      return await Review.create(review)
    } catch (err) {
      logger.error(err)
    }
  }
}

module.exports = SeedReviews
