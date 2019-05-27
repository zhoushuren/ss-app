const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')
const api = require('./api')
const router = new KoaRouter({ prefix: '/api' })

router.use(bodyParser())

router.get('/config', api.config)
router.get('/get_user_info', api.getuserInfo)
router.post('/user_signup', api.saveUserInfo)
router.post('/rulesets/detail', api.ruleset)

module.exports = router
