const _Sequelize = require('sequelize');
const Sequelize = require('../db/sequelize');
const sequelize = new Sequelize();

const User = sequelize.define('user', {
  username: _Sequelize.STRING,
  password: _Sequelize.STRING
});

module.exports = User;