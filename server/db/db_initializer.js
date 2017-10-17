const sequelizeCheck = require('./sequelize_check');
const User = require('../models/User');
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
        Role.sync({ force: dropTable }).then(() => {
          BusinessUser.sync({ force: dropTable }).then(() =>{
            resolve();
          });
        });
      });
    });
  }

  adminRoleCount(){
    return Role.count({where: {name: 'admin'}})
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
      can_be_deleted: false,
      create_bs_users: true,
      edit_bs_users: true,
      edit_users: true,
      edit_settings: true
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
            this.adminRoleCount().then(roleCount => {
              if(roleCount == 0){
                this.createDefaultAdminRole().then(role => {
                  this.createAdminWith(role);
                  Logger.log('Creating Admin with default admin role', Logger.INFO());
                });
              }else{
                this.getAdminRole().then(role => {
                  this.createAdminWith(role);
                  Logger.log('Creating Admin with existing admin role', Logger.INFO());
                });
              }
            });
          }else{
            Logger.log('Admin already exists', Logger.INFO());
          } 
        });
      });
    },(err) => {
      Logger.log('Unable to connect to the database', Logger.ERROR(err));
      throw err;
    });
  }
} 