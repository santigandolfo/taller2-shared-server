const Role = require('../../models/business-user/Role');
const sha256 = require('js-sha256').sha256;
module.exports = class RoleController {

  constructor(){}

  all(aLimit){
    aLimit = typeof aLimit  !== 'undefined' ? aLimit : 100;
    return Role.findAll({
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt'
        ]
      },
      limit: aLimit
    });
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
    return Role.findOne({
      where: {id: anId},
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt'
        ]
      }
    })
  }

  getByName(aName){
    return Role.findOne({
      where: {
        name: {
          [Op.like]: aName + '%'
        }
      },
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt'
        ]
      }
    })
  }
}