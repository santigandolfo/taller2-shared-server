const BusinessUser = require('../../models/business-user/BusinessUser');
const Role = require('../../models/business-user/Role');
const sha256 = require('js-sha256').sha256;
module.exports = class BusinessUserController {

  constructor(){}

  all(aLimit){
    aLimit = typeof aLimit  !== 'undefined' ? aLimit : 100;
    return BusinessUser.findAll({ 
      include: [
        { model: Role, 
          attributes: {
            exclude: [
              'id',
              'updatedAt',
              'createdAt'
            ]
          },
          as: 'role'
        }
      ], 
      attributes: {
        exclude: [
          'roleId',
          'password',
          'updatedAt',
          'createdAt',
        ]
      },
      limit: aLimit
    });
  }

  exists(user){
    return new Promise(resolve => {
      BusinessUser.count({ where:{
        username: user.username,
        password: sha256(user.password)
      }}).then(count => {
        resolve(count == 1);
      });
    })
  }

  isValid(user){
    const mUser = new BusinessUser(user);
    return mUser.validate();
  }

  setRole(aUserId,aRoleId){
    return new Promise(resolve => {
      this.getById(aUserId).then(user => {
        user.setRoleId(aRoleId);
        resolve();
      })
    });
  }

  create(user){
    user.password = sha256(user.password);
    return BusinessUser.create(user);
  }

  delete(anId){
    return BusinessUser.destroy({where:{ id: anId }});
  }

  update(user,anId){
    return BusinessUser.update(user,{where:{ id: anId }});
  }

  getByUsername(aUsername){
    return BusinessUser.findOne({
      where: {
        username: {
          [Op.like]: aUsername + '%'
        }
      },
      attributes: {
        exclude: [
          'password',
          'updatedAt',
          'createdAt'
        ]
      }
    })
  }

  getById(anId){
    return BusinessUser.findOne({
      where: {id: anId},
      attributes: {
        exclude: [
          'password',
          'updatedAt',
          'createdAt'
        ]
      }
    })
  }
}