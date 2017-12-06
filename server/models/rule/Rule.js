const _Sequelize = require('sequelize');
const Sequelize = require('../../db/sequelize');
const sequelize = new Sequelize();

const Rule = sequelize.define('rule', {
  name: {
    type: _Sequelize.STRING,
    allowNull: false
  },
  definition: {
    type: _Sequelize.TEXT,
  },
  belongsTo: {
    type: _Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Rule;