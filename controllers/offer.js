const offerService = require('~/services/offer')
const offerAggregateOptions = require('~/utils/offers/offerAggregateOptions')

const getOffers = async (req, res) => {
  const pipeline = offerAggregateOptions(req.query, req.params)

  const offers = await offerService.getOffers(pipeline)

  res.status(200).json(offers)
}

const getOfferById = async (req, res) => {
  const { id } = req.params

  const offer = await offerService.getOfferById(id)

  res.status(200).json(offer)
}

const createOffer = async (req, res) => {
  const { id: authorId, role: authorRole } = req.user
  const data = req.body

  const newOffer = await offerService.createOffer(authorId, authorRole, data)

  res.status(201).json(newOffer)
}

const updateOffer = async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const { id: currentUserId } = req.user

  await offerService.updateOffer(id, currentUserId, updateData)

  res.status(204).end()
}

const deleteOffer = async (req, res) => {
  const { id } = req.params
  const { id: currentUserId } = req.user

  await offerService.deleteOffer(id, currentUserId)

  res.status(204).end()
}

const getOffersByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId
    const pipeline = offerAggregateOptions(req.query, { ...req.params, categoryId })
    const offers = await offerService.getOffers(pipeline)
    res.json(offers)
  } catch (error) {
    next(error)
  }
}

const getOffersBySubject = async (req, res, next) => {
  try {
    const subjectId = req.params.subjectId
    const pipeline = offerAggregateOptions(req.query, { ...req.params, subjectId })
    const offers = await offerService.getOffers(pipeline)
    res.json(offers)
  } catch (error) {
    next(error)
  }
}

const getOffersByAuthor = async (req, res, next) => {
  try {
    const authorSearch = req.query.q
    const pipeline = offerAggregateOptions({ search: authorSearch }, req.params)
    const offers = await offerService.getOffers(pipeline)
    res.json(offers)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  getOffersByCategory,
  getOffersBySubject,
  getOffersByAuthor
}
