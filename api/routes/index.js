var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  path = __dirname.replace("routes", "") + '/views/index.html';
  res.sendFile(path);
});

module.exports = router;
