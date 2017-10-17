const express = require('express');
const router = express.Router();
const JwtAuth = require('../auth/JwtAuth');
const Logger = require('../../log/Logger');
const sha256 = require('js-sha256').sha256;

const BusinessUserController = require('../../controllers/business-controller/BusinessUserController')
const controller = new BusinessUserController();

router.post('/token', (req, res) => {
  let user = req.body;
  try{
    if(user.hasOwnProperty('username') && user.hasOwnProperty('password')){
      Logger.log(user.username + ' asked for a token',Logger.INFO());
      controller.exists(user).then(user => {
        if(user){
          res.status(201).json({ token: JwtAuth.token(user) });      
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
      res.status(400).send();
    }
  }catch(err){
    Logger.log("Token for (" + user + ") could not be created: ",Logger.ERROR(err));
    res.status(500).send(err);
  }
});

module.exports = router;