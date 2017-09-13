const db_url = process.env.DATABASE_URL;
const _Sequelize = require('sequelize');

exports.Sequelize = new _Sequelize(db_url);