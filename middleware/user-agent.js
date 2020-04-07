const isMobile = ua => !!ua.match(/AppleWebKit.*Mobile.*/)

export default function(context) {
	// 给上下文对象增加 userAgent 属性（增加的属性可在 `asyncData` 和 `fetch` 方法中获取）
	const userAgent = process.server
		? context.req.headers['user-agent']
		: navigator.userAgent
	context.userAgent = userAgent
	context.isMobile = isMobile(userAgent)
}
