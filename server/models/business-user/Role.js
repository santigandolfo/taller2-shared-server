const _Sequelize = require('sequelize');
const Sequelize = require('../../db/sequelize');
const sequelize = new Sequelize();

const Role = sequelize.define('role', {
  name: {
   type: _Sequelize.STRING,
   allowNull: false,
   unique: true
  },
  can_user_be_deleted: {
    type: _Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  view_bs_users: {
    type: _Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  create_bs_users: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  edit_bs_users: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  delete_bs_users: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  view_users: {
    type: _Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  edit_users: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  delete_users: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  view_settings: {
    type: _Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  edit_settings: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
});

module.exports = Role;