const router = require('express').Router({ mergeParams: true })

const { enums } = require('~/consts/validation')

const asyncWrapper = require('~/middlewares/asyncWrapper')

const getLanguages = (_req, res) => {
  res.status(200).json(enums.SPOKEN_LANG_ENUM)
}

router.get('/', asyncWrapper(getLanguages))

module.exports = router
