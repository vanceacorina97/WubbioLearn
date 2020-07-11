var express = require('express');
var router = express.Router();
const UserController = require('../modules/user/UserController');
const LoginController = require('../modules/login/LoginController');
const userController = new UserController();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', LoginController.authenticate, function (req, res) {
  userController.register(req, res);
});

router.post('/login', LoginController.localAuthenticate, function (req, res) {
  res.json({ token: req.user });
});

router.get('/allUsers', LoginController.authenticate, function (req, res) {
  userController.getAllUsers(req, res);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
