const Jwt = require('./Jwt');
const Logger = require('../../../../log/Logger');
const BusinessUserController = require('../../../../controllers/business-controller/BusinessUserController')
const controller = new BusinessUserController();

module.exports = class AuthVerifier {
  
  static verifyToken(req,res){
    Logger.log("Verifing Token...",Logger.INFO());
    return new Promise((resolve,reject) => {
      const authToken = req.headers['authtoken'];
      if(authToken){
        Logger.log("Token in header: " + authToken,Logger.INFO());
        Jwt.verify(authToken,(err,decoded) => {
          if(err != null){
            Logger.log("Invalid Token: " + authToken,Logger.ERROR(''));
            reject({
              error: "Invalid token."
            })
          }else{
            this.searchUserWith(decoded,res,resolve,reject);
          }
        });
      }else{
        Logger.log("Missing token.",Logger.WARNING());
        reject({
          error: "Missing token"
        })
      }
    });
  }

  static isAllowedTo(buser,permission){
    Logger.log("Checking permission '" + permission + "' for user: " + JSON.stringify(buser),Logger.INFO());
    return new Promise((resolve,reject) => {
      if(buser.role != null && buser.role[permission]){
        resolve();
      }else{
        reject({
          error: 'You are not allowed to perform this action' 
        });
      }
    });
  }

  static searchUserWith(decoded,res,resolve,reject){
    Logger.log("Token decoded.", Logger.INFO());
    controller.getByCreds(decoded.creds).then(authUser => {
      Logger.log("Business User found: " + JSON.stringify(authUser),Logger.INFO());
      if(authUser != null){
        resolve(authUser);
      }else{
        Logger.log("Token has an invalid user: " + JSON.stringify(decoded.creds),Logger.WARNING());
        reject({
          error: 'Invalid User'
        });
      }
    }).catch(fail => {
      Logger.log("Business Users could not be retrieved from token",Logger.ERROR(''));
      res.status(500).json({
        errors: [ {
            error: fail.toString()
          }
        ]
      });
    });
  }

  static signToken(user){
    return Jwt.token(user);
  }
}