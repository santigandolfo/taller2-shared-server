const sequelizeCheck = require('./sequelize_check');
const User = require('../models/user/User');
const Car = require('../models/user/Car');
const BusinessUser = require('../models/business-user/BusinessUser');
const Role = require('../models/business-user/Role');
const Trip = require('../models/trip/Trip');
const sha256 = require('js-sha256').sha256;
const Logger = require('../log/Logger');

let instance = null;
module.exports = class DBInitializer {  
  constructor() {
    if(!instance){
        this.environment = process.env.ENV || 'DEVELOPMENT';
        instance = this;
    }
    return instance;
  }

  initTables(){
    return new Promise(resolve => {
      let dropTable = false;//this.environment == 'DEVELOPMENT';
      Trip.sync({ force: dropTable }).then(() => {
        Car.sync({ force: dropTable }).then(() => {
          User.sync({ force: dropTable }).then(() => {
            Role.sync({ force: dropTable }).then(() => {
              BusinessUser.sync({ force: dropTable }).then(() =>{
                resolve();
              });
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

  managerRoleCount(){
    return Role.count({where: {name: 'manager'}})
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
      deletable: false,
      buser_deletable: false,
      view_roles: true,
      create_roles: true,
      delete_roles: true,
      assign_roles: true,
      create_bs_users: true,
      edit_bs_users: true,
      delete_bs_users: true,
      edit_users: true,
      edit_settings: true
    });
  }

  createDefaultAppRole(){
    return Role.create({
      name: 'app',
      deletable: false,
      view_roles: false,
      view_bs_users: false,
      create_users: true,
      delete_users: true,
      edit_users: true,
      create_trips: true
    });
  }

  createDefaultManagerRole(){
    return Role.create({
      name: 'manager',
      deletable: true,
      delete_users: true
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

  createAppWith(aRole){
    BusinessUser.create({
      username: 'appserver',
      password: sha256('appserver'),
      name: 'App',
      surname: 'Server'
    }).then(user => {
      user.setRole(aRole);
    });
  }

  initManagerRole(){
    this.managerRoleCount().then(managerRoleCount => {
      if(managerRoleCount == 0){
        this.createDefaultManagerRole().then(role => {
          Logger.log('Manager role created', Logger.INFO());
        });
      }else{
        Logger.log('Manager role already exists', Logger.INFO());
      }
    });
  }

  initAdmin(){
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
  }

  initApp(){
    this.appRoleCount().then(appRoleCount => {
      if(appRoleCount == 0){
        this.createDefaultAppRole().then(role => {
          Logger.log('App role created', Logger.INFO());
          this.createAppWith(role)
          Logger.log('App created with default app role', Logger.INFO()); 
        });
      }else{
        Logger.log('App role already exists', Logger.INFO());
      }
    });
  }

  initialize(){
    sequelizeCheck.dbCheck(() => {
      Logger.log('DB connection is up and running.', Logger.INFO());
      this.initTables().then(() => {
        this.initAdmin();
        this.initApp();
        this.initManagerRole();
      });
    },(err) => {
      Logger.log('Unable to connect to the database', Logger.ERROR(err));
      throw err;
    });
  }
} 