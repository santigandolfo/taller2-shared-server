const db_username = process.env.DB_USERNAME || 'postgres';
const db_password = process.env.DB_PASSWORD || '';
const db_name = process.env.DB_NAME || 'postgres';
const db_host = process.env.DB_HOST || 'localhost';

const _Sequelize = require('sequelize');
exports.Sequelize = new _Sequelize(db_name,db_username,db_password, {
  host: db_host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});