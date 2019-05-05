const sequelize = require('../config')
const Sequelize = require('sequelize')

const user = sequelize.define('user_info', {
    uuid: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    account_id: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    career: {
      type: Sequelize.STRING
    },
    share_code: {
      type: Sequelize.STRING
    },
    admin_id: {
      type: Sequelize.INTEGER
    }
  },
  {
    tableName: 'user_info',
    createdAt: 'created_at',
    updatedAt: false,
    getterMethods: {}
  })

module.exports = user
