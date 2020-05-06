const { authtokens, usuarios } = require('./models')

module.exports = async function (req, res, next) {
  const token = req.headers.authorization
  let expiration = {}
  let isValidToken = false
  let isAdmin = false

  if (token) {
    const isAuthorizedUser = await authtokens.findOne({
      attributes: ['createdAt', 'idusuario'],
      where: { token }
    })

    if (isAuthorizedUser) {
      const id = isAuthorizedUser.idusuario
      const admin = await usuarios.findOne({
        attributes: ['admin'],
        where: { id }
      })

      isAdmin = admin.admin > 0

      const now = new Date()
      expiration.max = now.setHours(now.getHours() + 2)
      expiration.min = now.setHours(now.getHours() - 2)
      isValidToken =
        expiration.min <= isAuthorizedUser.createdAt <= expiration.max
    }
  }

  if (isValidToken) {
    req.authorized = true
    req.admin = isAdmin
  } else {
    req.authorized = false
    req.admin = false
  }

  next()
}
