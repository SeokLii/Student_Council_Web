var express = require('express');
var router = express.Router(); //라우터 분리
var mysql_odbc = require('./database/database_conn')();
var conn = mysql_odbc.init();

/* Board List page */
router.get('/', function(req, res, next) {
  var sql = "select * from persons";
  conn.query(sql, function (err, rows) {
    if (err) {
      console.error("err : " + err);
    }
    else{
      console.log(rows);
      res.render('notice', { title: '제8대 소프트웨어학과 이룸학생회', rows: rows });
    }
  });
});
/*Post page*/


/* Update page */


/* Delete page */


/* page */
module.exports = router;
