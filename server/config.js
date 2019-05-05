const Sequelize = require('sequelize')
const sequelize = new Sequelize('ssapp', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 200,
    min: 10,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
})

module.exports = sequelize
