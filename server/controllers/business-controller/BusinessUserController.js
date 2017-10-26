const BusinessUser = require('../../models/business-user/BusinessUser');
const Role = require('../../models/business-user/Role');
const sha256 = require('js-sha256').sha256;
module.exports = class BusinessUserController {

  constructor(){}

  roleEagerly(){
    return { 
      model: Role, 
      attributes: {
        exclude: [
          'id',
          'updatedAt',
          'createdAt'
        ]
      },
      as: 'role'
    }
  }

  all(aLimit){
    aLimit = typeof aLimit  !== 'undefined' ? aLimit : 100;
    return BusinessUser.findAll({ 
      include: [this.roleEagerly()], 
      attributes: {
        exclude: [
          'roleId',
          'updatedAt',
          'createdAt',
        ]
      },
      limit: aLimit
    });
  }

  existsByCreds(user){
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
    const hashedPasswordUser = Object.assign({}, user);
    hashedPasswordUser.password = sha256(hashedPasswordUser.password);
    return BusinessUser.create(hashedPasswordUser);
  }

  delete(anId){
    return BusinessUser.destroy({where:{ id: anId }});
  }

  update(user,anId){
    return BusinessUser.update(user,{
      where:{ id: anId },
      include: [this.roleEagerly()],
      attributes: {
        exclude: [
          'id',
          'roleId',
          'password',
          'updatedAt',
          'createdAt'
        ]
      }
    });
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

  getByCreds(creds){
    return BusinessUser.findOne(
      { where: {username: creds.username,password: creds.password},
      include: [this.roleEagerly()],
      attributes: {
        exclude: [
          'id',
          'roleId',
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
      include: [this.roleEagerly()],
      attributes: {
        exclude: [
          'id',
          'roleId',
          'password',
          'updatedAt',
          'createdAt'
        ]
      }
    })
  }
}