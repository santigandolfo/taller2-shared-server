const _Sequelize = require('sequelize');
const Sequelize = require('../../db/sequelize');
const sequelize = new Sequelize();

const Role = require('./Role');

const BusinessUser = sequelize.define('business_user', {
  username: {
   type: _Sequelize.STRING,
   allowNull: false,
   unique: true
  },
  password: {
    type: _Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: _Sequelize.STRING
  },
  surname: {
    type: _Sequelize.STRING
  }
});
BusinessUser.belongsTo(Role);

module.exports = BusinessUser;