const jwt = require('jsonwebtoken')
const cookieparser = process.server ? require('cookieparser') : undefined

export default {
	nuxtServerInit({ commit }, { req }) {
		let auth = null
		if (req.headers.cookie) {
			const cookie = cookieparser.parse(req.headers.cookie)
			const { token } = cookie
			try {
				jwt.verify(token, 'secret_word', (error, result) => {
					if (error) auth = null
					auth = result
				})
			} catch (err) {
				// No valid cookie found
			}
			commit('setAuth', auth)
		}
	}
}
