var express = require('express');
var router = express.Router(); //라우터 분리

/* GET home page. */
router.get('/introduce', function(req, res, next) {
  if (!req.user) res.render('introduce', { logIO_L : 'login', logIO_T : '로그인' });
  else res.render('introduce', { logIO_L : 'logout', logIO_T : '로그아웃' });
});

module.exports = router;
