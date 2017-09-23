var jwt = require('jsonwebtoken');
module.exports = class JwtAuth {
  static token(user){
    const secret = process.env.TOKENS_SECRET;
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: user
    }, secret);
  }
}
