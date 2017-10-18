const Role = require('../../models/business-user/Role');
const sha256 = require('js-sha256').sha256;
module.exports = class RoleController {

  constructor(){}

  all(){
    return Role.findAll();
  }

  create(role){
    return Role.create(role);
  }

  delete(anId){
    return Role.destroy({where:{ id: anId }});
  }

  update(role,anId){
    return Role.update(role,{where:{ id: anId }});
  }

  getByName(aName){
    return Role.findOne({where: {name: aName}})
  }

  getById(anId){
    return Role.findOne({where: {id: anId}})
  }
}