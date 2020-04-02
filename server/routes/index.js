const Router = require('@koa/router')
const requireDirectory = require('require-directory')

function registerRouter(app) {
	requireDirectory(module, __dirname, {
		visit(router) {
			if (router instanceof Router) {
				app.use(router.routes()).use(router.allowedMethods())
			}
		}
	})
}

module.exports = registerRouter
