const Sequelize = require('./sequelize');

exports.dbCheck = (success,fail) => {
  Sequelize.authenticate().then(() => {
    success();
  }).catch(err => {
    fail(err);
  });
};
