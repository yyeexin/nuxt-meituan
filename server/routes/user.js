const Router = require('@koa/router')

const router = new Router({ prefix: '/user' })

router.get('/', (ctx, next) => {})

router.get('/:id', (ctx, next) => {
	console.log(ctx.params)
	ctx.body = {
		id: ctx.params.id
	}
})

module.exports = router
