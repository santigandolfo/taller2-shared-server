const Joi = require('joi');

module.exports = class SchemaHelper {

  static check(entity,schemaMap){
    return new Promise((resolve,reject) => {
      const validation = Joi.object().keys(schemaMap)
      Joi.validate(entity,validation,(err,value) => {
        if(err === null){
          resolve()
        }else{
          reject({
            errors: err.details.map(e => {
              return { error: e.message }
            })
          })
        }
      })
    });
  }
}