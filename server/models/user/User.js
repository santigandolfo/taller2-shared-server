const _Sequelize = require('sequelize');
const Sequelize = require('../../db/sequelize');
const sequelize = new Sequelize();

const Car = require('./Car');

const User = sequelize.define('user', {
  username: {
   type: _Sequelize.STRING,
   allowNull: false,
   unique: true
  },
  password: {
    type: _Sequelize.STRING,
    allowNull: false
   },
  type: {
    type: _Sequelize.STRING,
    allowNull: false
  },
  firstname: {
    type: _Sequelize.STRING
  },
  lastname: {
    type: _Sequelize.STRING
  },
  country: {
    type: _Sequelize.STRING
  },
  email: {
    type: _Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  birthdate: {
    type: _Sequelize.DATEONLY
  },
  image: {
    type: _Sequelize.STRING
  }
});

User.hasMany(Car);

module.exports = User;