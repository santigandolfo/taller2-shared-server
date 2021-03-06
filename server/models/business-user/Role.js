const _Sequelize = require('sequelize');
const Sequelize = require('../../db/sequelize');
const sequelize = new Sequelize();

const Role = sequelize.define('role', {
  name: {
   type: _Sequelize.STRING,
   allowNull: false,
   unique: true
  },
  deletable: {
    type: _Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  buser_deletable: {
    type: _Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  view_roles: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  create_roles: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  assign_roles: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  delete_roles: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
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
  create_users: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
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
  create_trips: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },  
  view_rules: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  view_my_rules: {
    type: _Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  run_rules: {
    type: _Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  create_rules: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  edit_rules: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  delete_rules: {
    type: _Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
});

module.exports = Role;