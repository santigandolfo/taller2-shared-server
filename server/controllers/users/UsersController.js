const User = require('../../models/User');
const sha256 = require('js-sha256').sha256;
module.exports = class UserController {

  constructor(){}

  all(){
    return User.findAll();
  }

  create(user){
    user.password = sha256(user.password);
    return User.create(user);
  }

  delete(anId){
    return User.destroy({where:{ id: anId }});
  }

  update(user,anId){
    return User.update(user,{where:{ id: anId }});
  }

  getByCreds(creds){
    return User.findOne({where: {username: creds.username,password: sha256(creds.password)}})
  }

  getById(anId){
    return User.findOne({where: {id: anId}})
  }
}