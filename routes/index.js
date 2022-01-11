var express = require('express');
var router = express.Router();
var app = express()
// respond with "hello world" when a GET request is made to the homepage

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Backend Server running with Express' });
});

module.exports = router;
