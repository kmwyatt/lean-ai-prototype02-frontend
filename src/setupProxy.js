// @ts-check

const { createProxyMiddleware } = require('http-proxy-middleware')

// @ts-ignore
module.exports = function (app) {
  app.use(
    ['/api', '/staticfiles'],
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  )
}
