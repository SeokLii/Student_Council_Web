var express = require('express');
var router = express.Router(); //라우터 분리

/* GET home page. */
router.get('/calendar', function(req, res, next) {
   console.log(req.user);
   if (!req.user) res.render('calendar', { logIO_L : 'login', logIO_T : '로그인' });
   else res.render('calendar', { logIO_L : 'logout', logIO_T : '로그아웃' });
});

module.exports = router;
