const sequelize = require('../config')
const Sequelize = require('sequelize')

const admin = sequelize.define('admin', {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    remark: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.NUMBER
    },
    level: {
      type: Sequelize.NUMBER
    }
  },
  {
    tableName: 'admin',
    createdAt: 'created_at',
    updatedAt: false,
    getterMethods: {}
  })

module.exports = admin
