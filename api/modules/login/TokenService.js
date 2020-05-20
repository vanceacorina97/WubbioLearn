const jwt = require('jsonwebtoken');
const _ = require('lodash');
const dotenv = require('dotenv');
dotenv.config();


const TOKEN_DEFAUL_AGE = 3600 * 24;

class Service {

  createJWToken(details) {
    if (typeof details !== 'object') {
      details = {}
    }

    if (!details.maxAge || typeof details.maxAge !== 'number') {
      details.maxAge = TOKEN_DEFAUL_AGE
    }

    details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
      if (typeof val !== "function" && key !== "password") {
        memo[key] = val
      }
      return memo
    }, {})

    let token = jwt.sign({
      data: details.sessionData
    }, process.env.JWT_SECRET, {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
    })
    return token
  }

}

const TokenService = new Service();
Object.freeze(TokenService);

module.exports = TokenService;