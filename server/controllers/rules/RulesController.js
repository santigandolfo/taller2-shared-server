const Rule = require('../../models/Rule/Rule');
const RuleEngine = require('node-rules');
const _Sequelize = require('sequelize')
const Op = _Sequelize.Op;

module.exports = class RulesController {

  getDefaultRule(){
    return {
      definition: this.def
    }
  }

}