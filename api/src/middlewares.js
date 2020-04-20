const { authtokens } = require( './models')

module.exports = async function(req, res, next) {
  const token = req.headers.authorization
	let expiration = {}
	let isValidToken = false

	if (token) {
		const isAuthorizedUser = await authtokens.findOne({
			attributes: ['createdAt'],
			where: { token }
		})

		if (isAuthorizedUser) {
			const now = new Date ()
			expiration.max = now.setHours(now.getHours() + 2)
			expiration.min = now.setHours(now.getHours() - 2)
			isValidToken = expiration.min <= isAuthorizedUser.createdAt <= expiration.max
		}
	}

	isValidToken ?  req.authorized = true : req.authorized = false

	next()
}