const randomstring = require('randomstring')

exports.login = async function(ctx, next) {
  const { uuid } = ctx.request.body
  let session = randomstring.generate(128)
  ctx.body = {
    success: true,
    session_token: session
  }
}

exports.config = async function(ctx, next) {
  ctx.body = {
    success: true,
    node_info: {
      ip: '67.230.176.41',
      port: 50000,
      password: '8244098763',
      method: 'aes-256-cfb'
    },
    web_url: {
      notify: 'wwww.aaa.com',
      personal: 'wwww.bbb.com'
    }
  }
}

exports.myAccount = async function(ctx) {
  ctx.body = {
    success: true
  }
}
