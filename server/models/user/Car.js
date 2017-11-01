const _Sequelize = require('sequelize');
const Sequelize = require('../../db/sequelize');
const sequelize = new Sequelize();

const Car = sequelize.define('car', {
  brand: {
   type: _Sequelize.STRING,
   allowNull: false,
  },
  model: {
    type: _Sequelize.STRING,
    allowNull: false
   },
  color: {
    type: _Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: _Sequelize.INTEGER
  }
});

module.exports = Car