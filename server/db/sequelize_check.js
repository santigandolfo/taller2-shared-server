const Sequelize = require('./sequelize');

const dbCheck = (success,fail) => {
  Sequelize.authenticate().then(() => {
    success()
  }).catch(err => {
    fail(err)
  });
}
export default dbCheck;
