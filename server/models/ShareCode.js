const sequelize = require('../config')
const Sequelize = require('sequelize')

const share_code = sequelize.define('share_code', {
    user_id: {
      type: Sequelize.STRING
    },
    share_user_id: {
      type: Sequelize.INTEGER
    },
    share_code: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: 'share_code',
    createdAt: 'created_at',
    updatedAt: false,
    getterMethods: {}
  })

module.exports = share_code
