var express = require('express');
var router = express.Router();
const UserController = require('../modules/user/UserController');
const LoginController = require('../modules/login/LoginController');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res) {
  const userController = new UserController();
  userController.register(req, res);
});

router.post('/login', LoginController.localAuthenticate, function (req, res) {
  res.json({ token: req.user });
});

router.get('/allUsers', LoginController.authenticate, function (req, res) {
  new UserController().getAllUsers(req, res);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
