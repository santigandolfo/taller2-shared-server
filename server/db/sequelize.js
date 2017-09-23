const db_url = process.env.DATABASE_URL;
const _Sequelize = require('sequelize');

let instance = null;
module.exports = class Sequelize{  
    constructor() {
        if(!instance){
            instance = new _Sequelize(db_url,{
                  logging: false
            });
        }
        return instance;
      }
} 