const { Schema, model } = require('mongoose')
const { OFFER, CATEGORY } = require('~/consts/models')

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Category name is required']
    },
    categoryIcon: {
      path: {
        type: String,
        required: [true, 'Category icon path is required']
      },
      color: {
        type: String,
        required: [true, 'Color value is required']
      }
    },
    totalOffers: {
      student: {
        type: Number,
        ref: OFFER,
        default: 0
      },
      tutor: {
        type: Number,
        ref: OFFER,
        default: 0
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model(CATEGORY, categorySchema)
