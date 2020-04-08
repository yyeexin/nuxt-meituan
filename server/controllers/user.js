const md5 = require('md5')
const User = require('../models/User')
async function addUser(ctx, next) {
	let { username, password, phone } = ctx.request.body
	username = String(username).trim()
	password = String(password).trim()
	phone = String(phone).trim()
	if (!username || !password) {
		ctx.status = 400
		return (ctx.body = {
			status: 400,
			message: '用户名或密码不能为空！'
		})
	}
	const exist = await User.findOne({ username })
	if (exist) {
		return (ctx.body = {
			status: 200,
			message: '用户名已存在!'
		})
	}
	try {
		await new User({
			username,
			password: md5(password),
			phone
		}).save()
		return (ctx.body = {
			status: 200,
			message: '添加用户成功!'
		})
	} catch (error) {
		ctx.status = 500
		return (ctx.body = {
			status: 500,
			message: '系统错误!',
			error
		})
	}
}

module.exports = {
	addUser
}
