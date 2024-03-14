const Review = require('~/models/review')
const reviews = require('~/consts/reviews')
const SeedReviews = require('~/seed/seedReviews')
const logger = require('~/logger/logger')

const checkReviewExistence = async () => {
  try {
    await Promise.all(
      Object.values(reviews).map(async (review) => {
        const isReviewExist = await Review.exists({ comment: review.comment })

        if (isReviewExist) {
          return
        }

        return await SeedReviews.createReview(review)
      })
    )
  } catch (err) {
    logger.error(err)
  }
}

module.exports = checkReviewExistence
