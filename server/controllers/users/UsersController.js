const User = require('../../models/User');
module.exports = class UserController {

  constructor(){}

  all(){
    return User.findAll();
  }

  create(user){
    return User.create(user);
  }

  delete(anId){
    return User.destroy({where:{ id: anId }});
  }

  update(user,anId){
    return User.update(user,{where:{ id: anId }});
  }

  getById(anId){
    return User.findOne({where: {id: anId}})
  }
}