const Router = require('@koa/router')
const UserController = require('../controllers/user')

const router = new Router({ prefix: '/user' })
const { addUser } = UserController

router.post('/add', addUser)

module.exports = router
