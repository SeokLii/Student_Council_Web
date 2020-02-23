var express = require('express');
var router = express.Router(); //라우터 분리
var mysql_odbc = require('./database/database_conn')();
var conn = mysql_odbc.init();

/* Board List page */
router.get('/notice', function(req, res, next) {
  var sql = "select * from board";
  conn.query(sql, function (err, rows) {
    if (err) {console.error("err : " + err);}
    else{res.render('notice', { title: '제8대 소프트웨어학과 이룸학생회', rows: rows });}
  });
});

/* writing page : only use Council*/
router.get('/notice/notice_write', function(req,res,next){
    res.render('notice_write',{title : "게시판 글 쓰기"});
});

router.post('/notice/notice_write/write', function(req,res,next){

    var title = req.body.title;
    var content = req.body.content;
    var studentID = req.body.studentID;
    var name = req.body.name;
    var grade = req.body.grade;
    var datas = [title,content, studentID, name, grade];


    var sql = "insert into board(number, title, content, studentID, name, grade)" +
                " values((select MAX(number)+1 from board a),?,?,?,?,?)";
                //board a를 넣어서 오류 뮨제를 해결한다 : select MAX(number)+1 from board a = number의 번호를 최대값 +1 해주는 코드
    conn.query(sql,datas, function (err, rows) {
        if (err){console.error("err : " + err);}
        else{res.redirect('/notice');}
    });
});

/*read page*/
/*read page : for user*/
router.get('/notice/notice_read/:number',function(req,res,next)
{
    var number = req.params.number;
    var sql = "select * from board where number=?";
    conn.query(sql,[number], function(err,row)
    {
        if(err) console.error(err);
        console.log(row[0]);
        res.render('notice_read', {title:"글 상세", row:row[0]});
    });
});


/*read page : only use Council*/


/* Update page */


/* Delete page */



module.exports = router;
