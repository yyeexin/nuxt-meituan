const md5 = require('md5')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function login(ctx, next) {
	let { username, password } = ctx.request.body
	username = String(username).trim()
	password = String(password).trim()
	if (!username || !password) {
		ctx.status = 400
		return (ctx.body = {
			status: 400,
			message: '用户名或密码不能为空！'
		})
	}
	const existUser = await User.findOne({ username })
	if (existUser) {
		if (md5(password) === existUser.password) {
			const { phone = '' } = existUser
			const token = jwt.sign({ username, phone }, 'secret_word', {
				expiresIn: '1h'
			})
			ctx.cookies.set('token', token, {
				maxAge: 1000 * 60 * 60,
				overwrite: true
			})
			return (ctx.body = {
				status: 200,
				message: '登录成功!',
				success: true,
				data: { username, phone }
			})
		} else {
			return (ctx.body = {
				status: 200,
				message: '密码错误!',
				success: false
			})
		}
	} else {
		return (ctx.body = {
			status: 200,
			message: '用户名不存在!',
			success: false
		})
	}
}
function logout(ctx, next) {
	ctx.cookies.set('token', '', { maxAge: 0, overwrite: true })
	ctx.body = {
		status: 200,
		message: '退出成功',
		success: true
	}
}

module.exports = {
	login,
	logout
}
