var express = require('express');
var router = express.Router(); //라우터 분리
var mysql_odbc = require('./database/database_conn')();
var conn = mysql_odbc.init();

/* GET home page. */
router.get('/quiz', function(req, res, next) {
  var sql = "select * from quiz";
  conn.query(sql, function (err, rows) {
    console.log(rows);
    if (!req.user) res.render('quiz', { logIO_L : 'login', logIO_T : '로그인', rows : rows });
    else res.render('quiz', { logIO_L : 'logout', logIO_T : '로그아웃', rows : rows });
  });

});

router.post('/calendar_write', function(req,res,next){
    var content = req.body.content;
    var content = req.body.content;


      var datas = [title, content, studentID, name, grade, source];
      var sql = "insert into board(number, title, content, studentID, name, grade, source, date)" +
                  " values((select MAX(number)+1 from board a),?,?,?,?,?,?,now())";

    conn.query(sql, datas, function (err, rows) {
        if (err){console.error("err : " + err);}
        else{res.redirect('/test');}
    });
});


module.exports = router;
