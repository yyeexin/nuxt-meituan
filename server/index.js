const Koa = require('koa')
const koaBody = require('koa-body')
const onerror = require('koa-onerror')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

app.on('error', (err, ctx) => {
	consola.error(err)
})

onerror(app)

app.use(koaBody())

// 注册路由
require('./routes')(app)

// 连接数据库
require('./models')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
	// Instantiate nuxt.js
	const nuxt = new Nuxt(config)

	const host = process.env.HOST || nuxt.options.server.host
	const port = process.env.PORT || nuxt.options.server.port

	await nuxt.ready()
	// Build in development
	if (config.dev) {
		const builder = new Builder(nuxt)
		await builder.build()
	}

	app.use(ctx => {
		ctx.status = 200
		ctx.respond = false // Bypass Koa's built-in response handling
		ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
		nuxt.render(ctx.req, ctx.res)
	})

	app.listen(port, host)
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true
	})
}

start()
