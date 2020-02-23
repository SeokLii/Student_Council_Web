var express = require('express');
var router = express.Router(); //라우터 분리

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '제8대 소프트웨어학과 이룸학생회' });
});

module.exports = router;
