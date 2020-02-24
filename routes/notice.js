var express = require('express');
var router = express.Router(); //라우터 분리
var mysql_odbc = require('./database/database_conn')();
var conn = mysql_odbc.init();

/* Board List page */
router.get('/notice/:page', function(req, res, next) { //메인에서 page:1로 넘겨주면 됌

  var page = req.params.page;
  var sql = "select * from board";
  conn.query(sql, function (err, rows) {
    if (err) {
      console.error("err : " + err);
    }
    else{
      res.render('notice', { title: '제8대 소프트웨어학과 이룸학생회', rows: rows, page: page, length: rows.length-1, page_num: 10, pass: true});
    }
  });
});

/* writing page : only use Council*/
router.get('/notice_write', function(req,res,next){
    res.render('notice_write',{title : "제8대 소프트웨어학과 이룸학생회"});
});

router.post('/notice_write/write', function(req,res,next){ //이모티콘 저장하는 것 체크하기

    var title = req.body.title;
    var content = req.body.content;
    var studentID = req.body.studentID;
    var name = req.body.name;
    var grade = req.body.grade;
    var source = req.body.source;
    var date = req.body.date;
    var imgPath = req.body.imgPath;
    var datas = [title, content, studentID, name, grade, source, date, imgPath];


    var sql = "insert into board(number, title, content, studentID, name, grade, source, date, imgPath)" +
                " values((select MAX(number)+1 from board a),?,?,?,?,?,?,?,?)";
                //board a를 넣어서 오류 뮨제를 해결한다 : select MAX(number)+1 from board a = number의 번호를 최대값 +1 해주는 코드
    conn.query(sql,datas, function (err, rows) {
        if (err){console.error("err : " + err);}
        else{res.redirect('/notice/1');}
    });
});

/*read page*/
/*read page : for user*/
router.get('/notice_read/:number',function(req,res,next) //:munber로 해당 페이지의 number을 넘겨준다.
{
    var number = req.params.number;
    var sql = "select * from board where number=?";
    conn.query(sql,[number], function(err,row)
    {
        if(err) console.error(err);
        res.render('notice_read', {title:"글 상세", row:row[0]});
    });
});


/*read page : only use Council*/


/* Update page */
router.get('/notice_update/:number', function(req,res,next){
  var number = req.params.number;
  var sql = "select * from board where number=?";
  conn.query(sql,[number], function(err,row)
  {
      if(err) console.error(err);
     res.render('notice_update',{title : "제8대 소프트웨어학과 이룸학생회", row:row[0]});
  });
});

router.post('/notice_update/update',function(req,res,next)
{
  var number = req.body.number;
  var title = req.body.title;
  var content = req.body.content;
  var studentID = req.body.studentID;
  var name = req.body.name;
  var grade = req.body.grade;
  var source = req.body.source;
  var date = req.body.date;
  var imgPath = req.body.imgPath;
  var datas = [title, content, studentID, name, grade, source, date, imgPath, number];

    var sql = "update board set title=?, content=?, studentID=?, name=?, grade=?, source=?, date=?, imgPath=? where number=?";
    conn.query(sql,datas, function(err,result)
    {
      if (err){console.error("err : " + err);}
      else{res.redirect('/notice/1');}
    });
});

/* Delete page */
router.get('/notice_delete/:number', function(req,res,next){ //삭제

    var number = req.params.number;
    var sql = "delete from board where number = ?";
    conn.query(sql,number, function (err, rows) {
        if (err){
          console.log(number);
          console.error("err : " + err);
      }
        else{
          console.log(number);
          res.redirect('/notice/1');
        }
    });
});


module.exports = router;
