const express = require('express');
const router = express.Router();

const JwtAuth = require('../auth/JwtAuth');
const auth = new JwtAuth();

router.post('/token', (req, res) => {
  let user = req.body;
  try{
    if(user.hasOwnProperty('username') && user.hasOwnProperty('password') ){
      console.log(user);
      res.status(201).json({ token: auth.token(user)});      
    }else{
      console.log(user);
      res.status(400).send("");
    }
  }catch(err){
    console.log(user);
    console.log(err)
    res.status(500).send(err);
  }
});

module.exports = router;