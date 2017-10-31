const Jwt = require('./Jwt');
const BusinessUserController = require('../../../../controllers/business-controller/BusinessUserController')
const controller = new BusinessUserController();

module.exports = class AuthVerifier {
  static verifyToken(req,res){
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
            this.searchUserWith(decoded);
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

  static searchUserWith(decoded){
    Logger.log("Token decoded.",Logger.INFO());
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
      Logger.log("Business Users could not be retrieved from token: " + JSON.stringify(fail.errors),Logger.ERROR(''));
      res.status(500).json({
        errors: fail.errors.map(err => {error: err.message})
      });
    });
  }

  static signToken(user){
    return Jwt.token(user);
  }
}