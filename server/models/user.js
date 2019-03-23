const sequelize = require('../config')
const Sequelize = require('sequelize')

const user = sequelize.define('user', {
    uuid: {
      type: Sequelize.STRING
    },
    account_id: {
      type: Sequelize.INTEGER
    }
  },
  {
    tableName: 'user',
    createdAt: 'created_at',
    updatedAt: false,
    getterMethods: {}
})

module.exports = user
