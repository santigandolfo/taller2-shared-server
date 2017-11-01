const User = require('../../models/user/User');
const sha256 = require('js-sha256').sha256;
module.exports = class UserController {

  constructor(){}

  all(aOffset,aLimit){
    aOffset = typeof aOffset !== 'undefined' ? aOffset : 0;
    aLimit = typeof aLimit !== 'undefined' ? aLimit : 100;
    return User.findAll({
      order: [
        ['username','ASC']
      ],
      attributes: {
        exclude: [
          'password',
          'updatedAt',
          'createdAt'
        ]
      },offset: aOffset,limit: aLimit});
  }

  isValid(user){
    const mUser = new User(user);
    return mUser.validate();
  }

  create(user){
    user.password = sha256(user.password);
    return User.create(user);
  }

  delete(anId){
    return User.destroy({where:{ id: anId }});
  }

  update(user,anId){
    if(user.hasOwnProperty('password'))
      user.password = sha256(user.password);
    return User.update(user,{
      where:{ id: anId }
    });
  }

  getByCreds(creds){
    return User.findOne(
      { where: {username: creds.username,password: sha256(creds.password)},
      attributes: {
        exclude: [
          'password',
          'updatedAt',
          'createdAt'
        ]
      }
    });
  }

  getById(anId){
    return User.findOne({
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