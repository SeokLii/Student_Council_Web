var express = require('express');
var router = express.Router(); //라우터 분리

/* GET home page. */
router.get('/notice', function(req, res, next) {
  res.render('notice', { title: '제8대 소프트웨어학과 이룸학생회' });
});

module.exports = router;
