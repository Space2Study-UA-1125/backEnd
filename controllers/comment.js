const commentService = require('~/services/comment')
const Comment = require('~/models/comment')

const addComment = async (req, res) => {
  const { id: authorId, role: authorRole } = req.user
  const { text } = req.body
  const { id: cooperationId } = req.params
  console.log('Author ID:', authorId)
  try {
    const comment = await commentService.addComment({
      text,
      author: authorId,
      authorRole,
      cooperationId
    })
    console.log(comment)
    const populatedComment = await Comment.findById(comment._id).populate({
      path: 'author',
      select: 'firstName lastName'
    })

    if (!populatedComment.author) {
      return res.status(500).json({ message: 'Author not found.' })
    }
    console.log('Populated Comment:', populatedComment)

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
    console.error(error)
    res.status(500).json({ message: 'An error occurred while adding the comment.', error: error.message })
  }
}

const getComments = async (req, res) => {
  const { id } = req.user
  const { id: cooperationId } = req.params
  console.log(req.params.id, req.user)
  console.log('Fetching comments for cooperationId:', cooperationId)
  try {
    const comments = await commentService.getComments(cooperationId, id)
    res.status(200).json(comments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred while fetching the comments.' })
  }
}

module.exports = {
  addComment,
  getComments
}
