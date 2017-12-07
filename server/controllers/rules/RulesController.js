const Rule = require('../../models/rule/Rule');
const RuleEngine = require('node-rules');
const _Sequelize = require('sequelize')
const Op = _Sequelize.Op;

module.exports = class RulesController {

  getByUserName(username){
    return Rule.all({ 
      where: {
        belongsTo: username
      }
    });
  }

  getById(anId){
    return Rule.findOne({ 
      where: {
        id: anId
      }
    });
  }

  getAll(){
    return Rule.all()
  }

  create(rule){
    return Rule.create(rule);
  }

  delete(anId){
    return Rule.destroy({where:{ id: anId }});
  }

  update(rule,anId){
    return Rule.update(rule,{
      where:{ id: anId },
    });
  }

}