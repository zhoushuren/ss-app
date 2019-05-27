const randomstring = require('randomstring')
const user = require('./models/user')
const UserInfo = require('./models/userInfo')
const ShareCode = require('./models/ShareCode')
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
    const arr = ['173.242.121.24', '67.230.176.41']
    const index = Math.round(Math.random())
    const ip = arr[index]
    ctx.body = {
      server: true,
      node_info: {
        ip: ip,
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
        flow: 20000000000,
        limit: 10,
        multiServerFlow: 2,
        orderId: 0,
        password: Math.round(Math.random() * 10E10) ,
        port: portObj.port,
        server: null,
        time: Date.now(),
        type: 3
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

exports.saveUserInfo = async function(ctx) {
  const {name, password, email, career, uuid} = ctx.request.body

  const res = await user.findOne({ where: {uuid}})
  if (!res) {
    return
  }
  await UserInfo.create({
    name,
    password,
    email,
    career,
    uuid,
    user_id: res.dataValues.id
  })
  ctx.body = {
    success: true
  }
}

exports.getuserInfo = async function(ctx) {
  const {uuid} = ctx.query

  const res = await UserInfo.findOne({where: {uuid},attributes: ['name','user_id', 'uuid', 'email', 'created_at', 'career']})

  const u = await user.findOne({where: {uuid}})
  if(!u) {
    return
  }
  let account = await getAccount(u.account_id)

  if(account === undefined) {
    account = {}
  }

  if (!res) {
    ctx.body = {
      success: false,
      data: {},
      account,
      account_id: u.account_id
    }
    return
  }

  ctx.body = {
    success: true,
    data: res,
    account,
    account_id: u.account_id
  }
}

// 填写邀请码
exports.shareCode = async function(ctx) {
  let {share_code,uuid} = ctx.request.body
  let user_info = await UserInfo.findOne({where: {share_code}}) // 邀请我的用户
  if(!user_info) {
    return
  }
  let selfUser = await UserInfo.findOne({where: {uuid}}) //  自己

  if (!selfUser) {
    return
  }

  await ShareCode.create({
    user_id: user_info.user_id,
    share_user_id: selfUser.user_id,
    share_code
  })

  ctx.body = {
    success: true
  }
}

exports.ruleset = async function (ctx) {
  ctx.body = [{
    "is_official":true,
    "id":"a096abd9-3855-4a91-9336-1d7e66aa5323",
    "description":"\u6b64\u89c4\u5219\u96c6\u7528\u4e8e\u5c4f\u853d\u56fd\u5185\u4e3b\u6d41 App \u89c6\u9891\u64ad\u653e\u524d\u7684\u5e7f\u544a\u3002 \r\n\u76ee\u524d\u5df2\u652f\u6301\uff1a \r\n* \u4f18\u9177 \r\n* \u571f\u8c46\r\n* \u817e\u8baf\u89c6\u9891\r\n* \u4e50\u89c6\u89c6\u9891\r\n* \u805a\u529b\u89c6\u9891\uff08PPTV\uff09\r\n* \u8292\u679c TV \r\n* \u641c\u72d0\u89c6\u9891",
    "updated_at":"2016-06-15T08:20:14",
    "created_at":"2016-06-14T14:51:11",
    "rules":[
      {
        "type":"URL",
        "action":"PROXY",
        "pattern":"www.google.com",
        "order":"0"
      },
      {
        "type":"URL",
        "action":"PROXY",
        "pattern":"*.youtube.com",
        "order":"0"
      }
    ],
    "name":"\u89c6\u9891 App \u5e7f\u544a\u5c4f\u853d",
    "enabled":true
  }]
}
