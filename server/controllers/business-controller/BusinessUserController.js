const BusinessUser = require('../../models/business-user/BusinessUser');
module.exports = class BusinessUserController {

  constructor(){}

  all(){
    return BusinessUser.findAll();
  }

  create(user){
    return BusinessUser.create(user);
  }

  delete(anId){
    return BusinessUser.destroy({where:{ id: anId }});
  }

  update(user,anId){
    return BusinessUser.update(user,{where:{ id: anId }});
  }

  getById(anId){
    return BusinessUser.findOne({where: {id: anId}})
  }
}