const express = require('express');
const router = express.Router();
const AuthHelper = require('./helpers/auth/AuthHelper');
const Logger = require('../../log/Logger');

const BusinessUserController = require('../../controllers/business-controller/BusinessUserController')
const controller = new BusinessUserController();

router.post('/token', (req, res) => {
  let user = req.body;
  try{
    if(user.hasOwnProperty('username') && user.hasOwnProperty('password')){
      Logger.log(user.username + ' asked for a token',Logger.INFO());
      controller.existsByCreds(user).then(exist => {
        Logger.log(user.username + "exists? " + exist,Logger.INFO());
        if(exist){
          res.status(201).json({ token: AuthHelper.signToken(user) });      
        }else{
          res.status(404).send();
        }
      }).catch(fail => {
        Logger.log("Token for (" + user.username + ") could not be created: " + JSON.stringify(fail.errors),Logger.ERROR());
        res.status(500).json({
          errors: fail.errors
        });
      });
    }else{
      Logger.log('Bad request in /token: ' + user,Logger.WARNING());
      res.status(400).json({
        error: 'bad formed credentials'
      });
    }
  }catch(err){
    Logger.log("Token for (" + user + ") could not be created: ",Logger.ERROR(err));
    res.status(500).send(err);
  }
});

module.exports = router;