const sequelize = require('../config')
const Sequelize = require('sequelize')

const admin_session = sequelize.define('admin_session', {
    admin_id: {
      type: Sequelize.STRING
    },
    session_token: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: 'share_code',
    createdAt: 'created_at',
    updatedAt: false,
    getterMethods: {}
  })

module.exports = admin_session
