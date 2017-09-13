const Sequelize = require('./sequelize');

exports.dbCheck = function(success,fail){
  new Sequelize().authenticate().then(() => {
    success();
  }).catch(err => {
    fail(err);
  });
};
