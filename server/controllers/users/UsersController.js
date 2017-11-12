const User = require('../../models/user/User');
const Car = require('../../models/user/Car');
const sha256 = require('js-sha256').sha256;
module.exports = class UserController {

  constructor(){}

  carsEagerly(){
    return { 
      model: Car, 
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt'
        ]
      },
      as: 'cars'
    }
  }

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

  deleteCar(aCarId,aUserId){
    return Car.destroy({
      where: {
        id: aCarId,
        userId: aUserId
      }
    })
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
      include: [this.carsEagerly()],
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