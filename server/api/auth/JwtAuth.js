var jwt = require('jsonwebtoken');
const sha256 = require('js-sha256').sha256;
module.exports = class JwtAuth { 
  static token(user){
    const secret = process.env.TOKENS_SECRET;
    return jwt.sign({
      creds: {
        username: user.username,
        password: sha256(user.password)
      },
      expiresAt: 0
    }, process.env.TOKENS_SECRET);
  }

  static verify(token,callback){
    jwt.verify(token,process.env.TOKENS_SECRET,callback);
  }
}
