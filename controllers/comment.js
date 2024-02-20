const commentService = require('~/services/comment')
const Comment = require('~/models/comment')
const errors = require('~/consts/errors')


const handleError = (error, res) => {
  if (error.name === 'ValidationError') {
    res.status(403).json({ ...errors.VALIDATION_ERROR, details: error.message })
  } else if (error.name === 'MongoServerError') {
    res.status(403).json({ ...errors.MONGO_SERVER_ERROR, details: error.message })
  } else {
    res.status(403).json({ ...errors.INTERNAL_SERVER_ERROR, details: error.message })
  }
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
    handleError(error, res)
  }
}

const getComments = async (req, res) => {
  const { id: cooperationId } = req.params

  try {
    const comments = await commentService.getComments(cooperationId, req.user.id)
    res.status(200).json(comments)
  } catch (error) {
    handleError(error, res)
  }
}

module.exports = {
  addComment,
  getComments
}
