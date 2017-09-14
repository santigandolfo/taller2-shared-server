var jwt = require('jsonwebtoken');
module.exports = class JwtAuth {
  
  constructor(){
    this.secret = 'EF3foe408HH4ul94cHMLnWwu6SObwqT5UIjyWqZYnzoIjRxb7BDa7XYbHw';
  }
  
  token(user){
    user["exp"] = Math.floor(Date.now() / 1000) + (60 * 60);
    return jwt.sign(user, this.secret);
  }
}
