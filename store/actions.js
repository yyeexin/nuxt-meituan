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
					if (error) commit('setAuth', null)
					auth = result
					commit('setAuth', auth)
				})
			} catch (err) {
				// No valid cookie found
			}
			commit('setAuth', auth)
		}
	}
}
