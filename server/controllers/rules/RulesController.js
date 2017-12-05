const Trip = require('../../models/trip/Trip');
const RuleEngine = require('node-rules');
const _Sequelize = require('sequelize')
const Op = _Sequelize.Op;

module.exports = class TripsController {

  constructor(){
    this.def = [ { condition: 'function (R) {\n        \n        R.when(this && (this.saldo < 0));\n    }',
    consequence: 'function (R) {\n        \n        \n        this.canTravel = false;\n        R.stop();\n    }',
    on: true },
    { condition: 'function (R) {\n        \n        \n        R.when(this && this.passenger.email.length > 12\n        && this.passenger.email.slice(-12) == \'@llevame.com\');\n    }',
    consequence: 'function (R) {\n        \n        \n        this.transactionTotal = 0;\n        R.stop();\n    }',
    on: true },
    { condition: 'function (R) {\n        \n        R.when(true);\n    }',
    consequence: 'function (R) {\n        \n        \n        this.transactionTotal = this.distance_in_km * 15;\n        R.next();\n    }',
    on: true },
    { condition: 'function (R) {\n        \n        R.when(this && this.momentOfStart\n         && this.momentOfStart.day() == 3\n         && this.momentOfStart.format(\'HHmmss\') >= \'160000\'\n         && this.momentOfStart.format(\'HHmmss\') <= \'170000\');\n    }',
    consequence: 'function (R) {\n        \n        this.transactionTotal = this.transactionTotal * 0.95;\n        R.next();\n    }',
    on: true },
    { condition: 'function (R) {\n        \n        R.when(this && (this.trips == 0));\n    }',
    consequence: 'function (R) {\n        \n        \n        this.transactionTotal -= 100;\n        R.next();\n    }',
    on: true },
    { condition: 'function (R) {\n        \n        R.when(this && this.momentOfStart.day() == 1\n        && this.momentOfStart.format(\'HHmmss\') >= \'170000\'\n        && this.momentOfStart.format(\'HHmmss\') <= \'190000\');\n   }',
    consequence: 'function (R) {\n        \n        \n        this.transactionTotal = this.transactionTotal * 1.10;\n        R.next();\n    }',
    on: true },
    { condition: 'function (R) {\n        \n        R.when(this && (this.passenger.tripsInLast30Minutes > 10));\n    }',
    consequence: 'function (R) {\n        \n        \n        this.transactionTotal = this.transactionTotal *1.15;\n        R.next();\n    }',
    on: true },
    { condition: 'function (R) {\n        \n        R.when(this && (this.transactionTotal < 50));\n    }',
    consequence: 'function (R) {\n        \n        this.transactionTotal = 50;\n        R.stop();\n    }',
    on: true } ]
  }

  getDefaultRule(){
    return {
      definition: this.def
    }
  }

}