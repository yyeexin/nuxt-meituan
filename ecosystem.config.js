module.exports = {
	apps: [
		{
			name: 'nuxt-website',
			script: 'server/index.js',
			watch: false,
			env_production: {
				PORT: 3004,
				NODE_ENV: 'production'
			}
		}
	]
}
