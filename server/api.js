const randomstring = require('randomstring')
const user = require('./models/user')
const rp = require('request-promise')
exports.login = async function(ctx, next) {
  const { uuid } = ctx.request.body
  let session = randomstring.generate(128)
  ctx.body = {
    success: true,
    session_token: session
  }
}

let host = 'http://127.0.0.1:6000'
exports.config = async function(ctx, next) {
  let { uuid } = ctx.header
  if (!uuid) {
    ctx.status = 403
    return
  }
  let id
  let res = await user.findOne({where: {uuid}})
  if (!res) {
    id = await newAccount()
    await user.create({
      uuid,
      account_id: id
    })
  }else {
    id = res.account_id
  }
  let data = await getAccount(id)
  let web_url = {
    notify: 'http://app.walkout.ga/notify',
    personal: 'http://app.walkout.ga/personal'
  }
  if(data) {
    ctx.body = {
      server: true,
      node_info: {
        ip: '67.230.176.41',
        port: data.port,
        password: data.password,
        method: 'aes-256-cfb',
        created_at: data.data.create,
        flow: data.data.flow,
        expire: data.data.expire,
        flowPack: data.data.flowPack
      },
      web_url
    }
  } else {
    ctx.body = {
      server: false,
      web_url
    }
  }
}

//请求账户系统开通账号
async function newAccount() {
  let portObj = await rp({
    uri: host + '/app/newPort',
    method: 'get',
    json: true
  })
  if (portObj && portObj.port) {
    let obj = await rp({
      uri: host + '/app/account',
      method: 'post',
      body: {
        autoRemove: 1,
        autoRemoveDelay: 0,
        flow: 5000000000,
        limit: 10,
        multiServerFlow: 0,
        orderId: 0,
        password: Math.round(Math.random() * 10E10) ,
        port: portObj.port,
        server: null,
        time: Date.now(),
        type: 4
      },
      json: true
    })
    return obj.id
  }
  console.error(portObj)
}

async function getAccount(id) {
  let res = await rp({
    uri: host + '/app/account/' +id,
    json: true
  })
  return res
}


exports.myAccount = async function(ctx) {
  ctx.body = {
    success: true
  }
}
