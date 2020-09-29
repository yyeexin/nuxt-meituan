const consola = require('consola')
const mongoose = require('mongoose')
const env = process.env.NODE_ENV || 'development'
const DBConfig = {
	development: {
		uris: 'mongodb://118.89.36.20:27017/dev-nuxt-website',
		options: {
			// user: 'yyeexin',
			// pass: 'Ayecin2018.',
			// authSource: 'admin',
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	},
	production: {
		uris: 'mongodb://118.89.36.20:27017/prod-nuxt-website',
		options: {
			// user: 'yyeexin',
			// pass: 'Ayecin2018.',
			// authSource: 'admin',
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	}
}

const { uris, options } = DBConfig[env]
mongoose.connect(uris, options)

const db = mongoose.connection
db.on('error', function(error) {
	consola.error(error)
})
db.once('open', function() {
	consola.success(`数据库${uris} 连接成功`)
})
