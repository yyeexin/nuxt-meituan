const Router = require('@koa/router')
const LoginController = require('../controllers/login')

const router = new Router()
const { login, logout } = LoginController

router.post('/login', login)
router.get('/logout', logout)

module.exports = router
