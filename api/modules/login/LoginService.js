const neo4jConfig = require('../../config');
const UserService = require('../../modules/user/UserService');
const bcrypt = require('bcrypt');
const TokenService = require('./TokenService');

class Service {
  session = neo4jConfig.config();

  comparePasswords = (user, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) { reject(err) }
        if (!result) {
          resolve({ message: 'Invalid credentials!' });
        }
        const token = TokenService.createJWToken({
          sessionData: user,
          maxAge: 3600
        })
        resolve({ token: token });
      });
    })
  }

  async authenticateByCredentials(email, password) {
    const result = await UserService.getByEmail(email)
      .then((user) => {
        if (user == undefined) {
          return { message: 'Invalid credentials!' };
        }
        return user;
      }).catch((err) => {
        throw err;
      });

    if (result.message) {
      return result;
    }
    const token = await this.comparePasswords(result, password);
    return token;

  }
}

const LoginService = new Service();
Object.freeze(LoginService);

module.exports = LoginService;