const userService = require('~/services/user')
const { createForbiddenError, createError } = require('~/utils/errorsHelper')
const { hashPassword, comparePasswords } = require('~/utils/passwordHelper')
const createAggregateOptions = require('~/utils/users/createAggregateOptions')
const { INCORRECT_CREDENTIALS, WRONG_CURRENT_PASSWORD } = require('~/consts/errors')
const getUsers = async (req, res) => {
  const { skip, limit, sort, match } = createAggregateOptions(req.query)

  const users = await userService.getUsers({ skip, limit, sort, match })

  res.status(200).json(users)
}

const getUserById = async (req, res) => {
  const { id } = req.params
  const { role } = req.query

  const user = await userService.getUserById(id, role)

  res.status(200).json(user)
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { role } = req.user
  const updateData = req.body

  if (id !== req.user.id) throw createForbiddenError()

  if (updateData.password) {
    const userById = await userService.getUserById(id)
    const user = await userService.getUserByEmail(userById.email)
    if (!(await comparePasswords(updateData.oldPassword, user.password))) throw createError(401, WRONG_CURRENT_PASSWORD)
    if (await comparePasswords(updateData.password, user.password)) throw createError(401, INCORRECT_CREDENTIALS)

    const hashedPassword = await hashPassword(updateData.password)
    await userService.privateUpdateUser(id, { password: hashedPassword })
  } else await userService.updateUser(id, role, updateData)

  res.status(204).end()
}

const updateStatus = async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  await userService.updateStatus(id, updateData)

  res.status(204).end()
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  await userService.deleteUser(id)

  res.status(204).end()
}

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateStatus
}
