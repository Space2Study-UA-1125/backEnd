const Offer = require('~/models/offer')
const logger = require('~/logger/logger')

const SeedOffers = {
  createOffer: async (offer) => {
    try {
      return await Offer.create(offer)
    } catch (err) {
      logger.error(err)
    }
  }
}

module.exports = SeedOffers
