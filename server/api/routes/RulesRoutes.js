const express = require('express');
const router = express.Router();

const Logger = require('../../log/Logger')
const AuthHelper = require('./helpers/auth/AuthHelper');
const RulesController = require('../../controllers/rules/RulesController')
const controller = new RulesController();

router.get('/to/me', (req, res) => {
  const userId = req.params.userId 
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'view_my_rules').then(() => {
      res.status(200).json(
        controller.getDefaultRule()
      );
    }).catch(error => {
      Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
      res.status(401).json(error)
    });
  }).catch(error => {
    Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
    res.status(401).json(error)
  });  
})

router.post('/', (req, res) => {
  let rule = req.body;
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'create_rules').then(() => {
      res.status(200).send();
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
      // controller.getAll().then(rules => {

      // })
      res.status(200).send();
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
      res.status(200).send();
  }).catch(error => {
    Logger.log("User unauthorized: " + JSON.stringify(error),Logger.WARNING());
    res.status(401).json(error)
  }); 
})

router.put('/:ruleId', (req, res) => {
  const userId = req.params.userId 
  AuthHelper.verifyToken(req, res).then(authUser => {
    AuthHelper.isAllowedTo(authUser,'edit_rules').then(() => {
      res.status(200).send();
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
      res.status(200).send();
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