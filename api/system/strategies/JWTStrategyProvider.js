const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserService = require('../../modules/user/UserService');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const dotenv = require('dotenv');
dotenv.config();


const getJWTStrategy = () => {
    return new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
        function (token, done) {
            UserService.getUserById(token.data.id)
                .then((user) => {
                    return done(null, user);
                }).catch((err) => {
                    const error = new ErrorUnauthorized("Unauthorized");
                    return done(error);
                });
        }
    )
};

module.exports = getJWTStrategy;