module.exports = {
	apps: [
		{
			name: 'nuxt-website',
			script: 'server/index.js',
			watch: false,
			env_production: {
				PORT: 3003,
				NODE_ENV: 'production'
			}
		}
	]
}
