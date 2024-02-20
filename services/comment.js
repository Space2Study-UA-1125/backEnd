const userService = require('~/services/user')
const Comment = require('~/models/comment')


const commentService = {
  addComment: async (data) => {
    const { text, author, authorRole, cooperationId } = data
    const authorData = await userService.getUserById(author, authorRole)
    return await Comment.create({ author, cooperation: cooperationId, text, authorRole, authorData })
  },
  getComments: async (cooperationId, userId) => {
    return await Comment.find({ cooperation: cooperationId, author: userId }).populate('author').exec()
  }
}

module.exports = commentService
