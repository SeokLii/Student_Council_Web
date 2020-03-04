var express = require('express');
var router = express.Router(); //라우터 분리
var mysql_odbc = require('./database/database_conn')();
var conn = mysql_odbc.init();


/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "select number, title, content, studentID, name, grade, source, date_format(date, '%Y-%m-%d')date, imgPath from board";
  conn.query(sql, function (err, rows) {
    if (err) console.error("err : " + err);
    console.log(rows.length);
    if (!req.user) res.render('index', { logIO_L : 'login', logIO_T : '로그인', rows: rows, length: rows.length-1, pagenum: rows.length-11, pass: true });
    else res.render('index', { logIO_L : 'logout', logIO_T : '로그아웃', rows : rows, length : rows.length-1, pagenum: rows.length-11, pass: true });
  });
});



module.exports = router;
