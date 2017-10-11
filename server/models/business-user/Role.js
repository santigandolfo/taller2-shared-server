const _Sequelize = require('sequelize');
const Sequelize = require('../db/sequelize');
const sequelize = new Sequelize();

const Role = sequelize.define('role', {
  role: {
   type: _Sequelize.STRING,
   allowNull: false,
   unique: true
  }
});

module.exports = Role;