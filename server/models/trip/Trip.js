const _Sequelize = require('sequelize');
const Sequelize = require('../../db/sequelize');
const sequelize = new Sequelize();

const Trip = sequelize.define('trip', {
  start_location: {
    type: _Sequelize.GEOMETRY('POINT'),
    allowNull: false
  },
  end_location: {
    type: _Sequelize.GEOMETRY('POINT'),
    allowNull: false
  },
  distance: {
    type: _Sequelize.DOUBLE,
    allowNull: false
  },
  pay_method: {
    type: _Sequelize.STRING,
    allowNull: false
  }, 
  currency: {
    type: _Sequelize.STRING,
    allowNull: false
  },
  cost: {
    type: _Sequelize.DOUBLE,
    allowNull: false
  }, 
  driver_id: {
    type: _Sequelize.INTEGER,
    allowNull: false
  },
  passenger_id: {
    type: _Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Trip;