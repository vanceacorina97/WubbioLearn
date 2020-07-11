const passport = require('passport');
const ErrorUnauthorized = require('../../system/errors/ErrorUnauthorized');

class LoginController {

    localAuthenticate = (req, res, next) => passport.authenticate('local', { session: false }, function (err, user, info) {
        if (user) {
            res.send(user);
        }
        if (err) {
            return next(err);
        }
        if (info) {
            res.status(403).send(info);
        }
    })(req, res, next);

    authenticate = (req, res, next) => passport.authenticate('jwt', { session: false }, function (notFoundUserErr, info, err) {
        if (notFoundUserErr) {
            next(notFoundUserErr);
        }
        if (err) {
            next(new ErrorUnauthorized("Unauthorized"));
        }
        req.user = info;
        next();
    })(req, res, next);
}

const loginController = new LoginController();
Object.freeze(loginController);

module.exports = loginController;