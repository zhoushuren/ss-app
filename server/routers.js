const KoaRouter = require('koa-router')
const api = require('./api')
const router = new KoaRouter({ prefix: '/api' })

router.get('/config', api.config)

module.exports = router
