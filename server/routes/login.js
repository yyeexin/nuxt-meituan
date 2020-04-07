const Router = require('@koa/router')
const jwt = require('jsonwebtoken')

const router = new Router()

router.post('/login', (ctx, next) => {
	const { username, password } = ctx.request.body
	const token = jwt.sign({ username, password }, 'secret_word', {
		expiresIn: '1h'
	})
	ctx.cookies.set('token', token, {
		maxAge: 1000 * 60 * 60,
		overwrite: true
	})
	ctx.body = {
		status: 200,
		message: '登录成功',
		token
	}
})

router.get('/logout', (ctx, next) => {
	ctx.cookies.set('token', '', { maxAge: 0, overwrite: true })
	ctx.body = {
		status: 200,
		message: '退出成功'
	}
})

module.exports = router
