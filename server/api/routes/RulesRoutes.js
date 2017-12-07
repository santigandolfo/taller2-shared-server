const express = require('express');
const router = express.Router();

const Logger = require('../../log/Logger')
const AuthHelper = require('./helpers/auth/AuthHelper');
const RulesController = require('../../controllers/rules/RulesController')
const controller = new RulesController();

router.post('/', (req, res) => {
  let rule = req.body;
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'create_rules').then(() => {
      controller.create(rule).then(rule => {
        res.status(200).json({
          id: rule.id
        });
      })
    }).catch(error => {
      Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
      res.status(401).json(error)
    });
  }).catch(error => {
    Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
    res.status(401).json(error)
  });      
})

router.get('/', (req, res) => {
  const ruleId  = req.params.ruleId 
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'view_rules').then(() => {
      controller.getAll().then(rules => {
        res.status(200).json(rules);
      })
    }).catch(error => {
      Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
      res.status(401).json(error)
    });
  }).catch(error => {
    Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
    res.status(401).json(error)
  });  
})

router.get('/:ruleId', (req, res) => {
  const ruleId  = req.params.ruleId 
  AuthHelper.verifyToken(req, res).then(authUser => {
    controller.getById(ruleId).then(rule => {
      if(rule != null){
        res.status(200).json(rule);
      }else{
        res.status(404).json({
          error: "Rule with id " + id + " not found."
        });
      }
    })
  }).catch(error => {
    Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
    res.status(401).json(error)
  }); 
})

router.put('/:ruleId', (req, res) => {
  const ruleId = req.params.ruleId 
  let rule = req.body;
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'edit_rules').then(() => {
      controller.update(rule,ruleId).then(() => {
        res.status(200).send();
      })
    }).catch(error => {
      Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
      res.status(401).json(error)
    });
  }).catch(error => {
    Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
    res.status(401).json(error)
  }); 
})

router.delete('/:ruleId', (req, res) => {
  const ruleId = req.params.ruleId 
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'delete_rules').then(() => {
      controller.delete(ruleId).then(() => {
        res.status(200).send();
      })
    }).catch(error => {
      Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
      res.status(401).json(error)
    });
  }).catch(error => {
    Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
    res.status(401).json(error)
  }); 
})

module.exports = router;