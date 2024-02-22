const commentService = require('~/services/comment')
const Comment = require('~/models/comment')
const errors = require('~/consts/errors')

const getErrorResponse = (error) => {
  let errorResponse = { ...errors.INTERNAL_SERVER_ERROR, details: error.message }
  let statusCode = 403

  if (error.name === 'ValidationError') {
    errorResponse = { ...errors.VALIDATION_ERROR, details: error.message }
  } else if (error.name === 'MongoServerError') {
    errorResponse = { ...errors.MONGO_SERVER_ERROR, details: error.message }
  }

  return { statusCode, errorResponse }
}

const addComment = async (req, res) => {
  const { id: authorId, role: authorRole } = req.user
  const { text } = req.body
  const { id: cooperationId } = req.params

  try {
    const comment = await commentService.addComment({
      text,
      author: authorId,
      authorRole,
      cooperationId
    })
    const populatedComment = await Comment.findById(comment._id).populate({
      path: 'author',
      select: 'firstName lastName'
    })

    if (!populatedComment.author) {
      return res.status(404).json(errors.USER_NOT_FOUND)
    }

    const response = {
      _id: populatedComment._id,
      text: populatedComment.text,
      author: {
        _id: populatedComment.author._id,
        firstName: populatedComment.author.firstName,
        lastName: populatedComment.author.lastName
      },
      cooperation: populatedComment.cooperation,
      createdAt: populatedComment.createdAt,
      updatedAt: populatedComment.updatedAt
    }

    res.status(201).json(response)
  } catch (error) {
    const { statusCode, errorResponse } = getErrorResponse(error)
    res.status(statusCode).json(errorResponse)
  }
}

const getComments = async (req, res) => {
  const { id: cooperationId } = req.params

  try {
    const comments = await commentService.getComments(cooperationId, req.user.id)
    res.status(200).json(comments)
  } catch (error) {
    const { statusCode, errorResponse } = getErrorResponse(error)
    res.status(statusCode).json(errorResponse)
  }
}

module.exports = {
  addComment,
  getComments
}
