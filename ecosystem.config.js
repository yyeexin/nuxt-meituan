module.exports = {
	apps: [
		{
			name: 'my-home-page',
			script: 'server/index.js',
			watch: false,
			env_production: {
				HOST: '0.0.0.0',
				PORT: 3003,
				NODE_ENV: 'production'
			}
		}
	]
}
