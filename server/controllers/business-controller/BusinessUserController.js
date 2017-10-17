const BusinessUser = require('../../models/business-user/BusinessUser');
const Role = require('../../models/business-user/Role');
module.exports = class BusinessUserController {

  constructor(){}

  all(aLimit){
    aLimit = typeof aLimit  !== 'undefined' ? aLimit : 100;
    return BusinessUser.findAll({ include: [
      { model: Role, 
        attributes: {
          exclude: [
            'id',
            'updatedAt',
            'createdAt'
          ]
        },
        as: 'role'}
    ], attributes: {
      exclude: [
        'roleId',
        'password',
        'updatedAt',
        'createdAt',
      ]
    },limit: aLimit});
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