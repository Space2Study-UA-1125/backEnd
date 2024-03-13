const Offer = require('~/models/offer')
const offers = require('~/consts/offers')
const SeedOffers = require('~/seed/seedOffers')
const logger = require('~/logger/logger')

const checkOfferExistence = async () => {
  try {
    await Promise.all(
      Object.values(offers).map(async (offer) => {
        const isOfferExist = await Offer.exists({ title: offer.title })

        if (isOfferExist) {
          return
        }

        return await SeedOffers.createOffer(offer)
      })
    )
  } catch (err) {
    logger.error(err)
  }
}

module.exports = checkOfferExistence
