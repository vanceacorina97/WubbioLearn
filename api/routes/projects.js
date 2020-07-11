var express = require('express');
var router = express.Router();
const ProjectController = require('../modules/project/ProjectController');
const LoginController = require('../modules/login/LoginController');
const upload = require('../system/multer/MulterHelper');
const PhotoController = require('../modules/photo/PhotoController');
const projectController = new ProjectController();
const photoController = new PhotoController();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/allProjects', LoginController.authenticate, function (req, res) {
  projectController.getAllProjects(req, res);
});

router.post('/createProject',
  LoginController.authenticate,
  upload.array('images', 5),
  projectController.createProject,
  photoController.uploadPhotos);

router.get('/getProject',
  projectController.getProject,
  photoController.getAllPhotosFromProject);

module.exports = router;
