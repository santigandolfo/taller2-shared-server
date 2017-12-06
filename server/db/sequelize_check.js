const Sequelize = require('./sequelize');
const Logger = require('../log/Logger')
exports.dbCheck = function(success,fail){
  new Sequelize().authenticate().then(() => {
    new Sequelize().query('CREATE EXTENSION IF NOT EXISTS postgis').then(() => {
      Logger.log('PostGIS extension created',Logger.INFO())
    }).catch(err => {
      Logger.log('Could not create PostGIS extension',Logger.ERROR(err))
    })
    success();
  }).catch(err => {
    fail(err);
  });
};
