var express = require('express');
var router = express.Router();
const ProjectController = require('../modules/project/ProjectController');
const LoginController = require('../modules/login/LoginController');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/allProjects', LoginController.localAuthenticate, function (req, res) {
  const projectController = new ProjectController();
  projectController.getAllProjects(req, res);
});

router.post('/createProject', LoginController.authenticate, function (req, res) {
  const projectController = new ProjectController();
  projectController.createProject(req, res);
});

module.exports = router;
