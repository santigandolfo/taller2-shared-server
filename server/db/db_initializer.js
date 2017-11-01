const sequelizeCheck = require('./sequelize_check');
const User = require('../models/user/User');
const Car = require('../models/user/Car');
const BusinessUser = require('../models/business-user/BusinessUser');
const Role = require('../models/business-user/Role');
const sha256 = require('js-sha256').sha256;
const Logger = require('../log/Logger');

let instance = null;
module.exports = class DBInitializer{  
  constructor(environment) {
    if(!instance){
        this.environment = environment;
        instance = this;
    }
    return instance;
  }

  initTables(){
    return new Promise(resolve => {
      let dropTable = this.environment == 'DEVELOPMENT';
      User.sync({ force: dropTable }).then(() => {
        Car.sync({ force: dropTable }).then(() => {
          Role.sync({ force: dropTable }).then(() => {
            BusinessUser.sync({ force: dropTable }).then(() =>{
              resolve();
            });
          });
        });
      });
    });
  }

  adminRoleCount(){
    return Role.count({where: {name: 'admin'}})
  }

  appRoleCount(){
    return Role.count({where: {name: 'app'}})
  }

  adminCount(){
    return BusinessUser.count({where: {username: 'admin'}})
  }

  getAdminRole(){
    return Role.findOne({where: {name: 'admin'}})
  }

  createDefaultAdminRole(){
    return Role.create({
      name: 'admin',
      can_buser_be_deleted: false,
      view_roles: true,
      create_roles: true,
      delete_roles: true,
      assign_roles: true,
      edit_bs_users: true,
      delete_users: true,
      edit_settings: true
    });
  }

  createDefaultAppRole(){
    return Role.create({
      name: 'app',
      view_roles: false,
      view_bs_users: false,
      create_users: true,
      delete_users: true,
      edit_users: true
    });
  }

  createAdminWith(aRole){
    BusinessUser.create({
      username: 'admin',
      password: sha256('admin'),
      name: 'Admin',
      surname: 'FiUber'
    }).then(user => {
      user.setRole(aRole);
    });
  }

  initialize(){
    sequelizeCheck.dbCheck(() => {
      Logger.log('DB connection is up and running.', Logger.INFO());
      this.initTables().then(() => {
        this.adminCount().then(adminCount => {
          if(adminCount == 0){
            this.adminRoleCount().then(adminRoleCount => {
              if(adminRoleCount == 0){
                this.createDefaultAdminRole().then(role => {
                  Logger.log('Admin role created', Logger.INFO());
                  this.createAdminWith(role);
                  Logger.log('Admin created with default admin role', Logger.INFO());
                });
              }else{
                Logger.log('Admin role already exists', Logger.INFO());
                this.getAdminRole().then(role => {
                  this.createAdminWith(role);
                  Logger.log('Admin created with existing admin role', Logger.INFO());
                });
              }
            });
          }else{
            Logger.log('Admin already exists', Logger.INFO());
          } 
        });
        this.appRoleCount().then(appRoleCount => {
          if(appRoleCount == 0){
            this.createDefaultAppRole();
            Logger.log('App role created', Logger.INFO());
          }else{
            Logger.log('App role already exists', Logger.INFO());
          }
        });
      });
    },(err) => {
      Logger.log('Unable to connect to the database', Logger.ERROR(err));
      throw err;
    });
  }
} 