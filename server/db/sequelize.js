const db_url = process.env.DATABASE_URL;
const _Sequelize = require('sequelize');

const db = {
    DEVELOPMENT: new _Sequelize(db_url,{
        maxConcurrentQueries: 100,
        logging: true
    })
};

let instance = null;
module.exports = class Sequelize { 
    constructor() {
        if(!instance){
            const environment = process.env.ENV
            instance = db[environment]
        }
        return instance;
      }
} 