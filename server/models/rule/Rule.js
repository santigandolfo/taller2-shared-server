const _Sequelize = require('sequelize');
const Sequelize = require('../../db/sequelize');
const sequelize = new Sequelize();

const Rule = sequelize.define('rule', {
  definition: {
    type: _Sequelize.STRING,
    allowNull: false
  },
  app_id: {
    type: _Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Rule;