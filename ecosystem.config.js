module.exports = {
	apps: [
		{
			name: 'nuxt-website',
			script: 'npm',
			args: 'run start',
			watch: false,
			env_production: {
				PORT: 3003,
				NODE_ENV: 'production'
			}
		}
	]
}
