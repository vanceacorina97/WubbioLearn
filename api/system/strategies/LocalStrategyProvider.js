const LocalStrategy = require('passport-local').Strategy;
const LoginService = require('../../modules/login/LoginService');

const getLocalStrategy = () => {
  return new LocalStrategy(
    function (email, password, done) {
      LoginService.authenticateByCredentials(email, password)
        .then((result) => {
          if (result.message) {
            return done(null, false, result);
          }
          return done(null, result);
        }).catch((err) => {
          return done(err.message);
        });
    }
  )
};

module.exports = getLocalStrategy;