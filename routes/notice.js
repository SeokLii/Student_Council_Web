var express = require('express');
var router = express.Router(); //라우터 분리
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/notice_img') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) { // 동일한 파일이 존재할 때 처리 해야 함
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
var upload = multer({ storage: storage })
var mysql_odbc = require('./database/database_conn')();
var conn = mysql_odbc.init();
var user = require('./database/database_user');

/* Board List page */
router.get('/notice/:page', function(req, res, next) { //메인에서 page:1로 넘겨주면 됌

  var page = req.params.page;
  var sql = "select number, title, content, studentID, name, grade, source, date_format(date, '%Y-%m-%d')date, imgPath from board";
  conn.query(sql, function (err, rows) {
    if (err) console.error("err : " + err);
    if (req.user == null){
    if (!req.user) res.render('notice', {logIO_L : 'login', logIO_T : '로그인', rows: rows, page: page, length: rows.length-1, page_num: 20, pass: true});
    else res.render('notice', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows, page: page, length: rows.length-1, page_num: 20, pass: true});
  } else{
    if(
      (req.user.id == user.LeeWanSeok.id && req.user.password == user.LeeWanSeok.password)||
       (req.user.id == user.KimYongGi.id && req.user.password == user.KimYongGi.password)||
       (req.user.id == user.JeongGyeongChang.id && req.user.password == user.JeongGyeongChang.password)||
       (req.user.id == user.LeeHaEun.id && req.user.password == user.LeeHaEun.password)||
       (req.user.id == user.KimSeoBin.id && req.user.password == user.KimSeoBin.password)||
       (req.user.id == user.LeeSungKyu.id && req.user.password == user.LeeSungKyu.password)||
       (req.user.id == user.YoonJeong.id && req.user.password == user.YoonJeong.password)||
       (req.user.id == user.KimJaeHoon.id && req.user.password == user.KimJaeHoon.password)||
       (req.user.id == user.ShinYuJeong.id && req.user.password == user.ShinYuJeong.password)||
       (req.user.id == user.LeeSeonMyeong.id && req.user.password == user.LeeSeonMyeong.password)||
       (req.user.id == user.HongJinBin.id && req.user.password == user.HongJinBin.password)||
       (req.user.id == user.JeongDaehwan.id && req.user.password == user.JeongDaehwan.password)||
       (req.user.id == user.LeeSunyoung.id && req.user.password == user.LeeSunyoung.password)||
       (req.user.id == user.KimSuNa.id && req.user.password == user.KimSuNa.password)
       ){
    if (!req.user) res.render('noticeDev', {logIO_L : 'login', logIO_T : '로그인', rows: rows, page: page, length: rows.length-1, page_num: 20, pass: true});
    else res.render('noticeDev', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows, page: page, length: rows.length-1, page_num: 20, pass: true});
    }
  }
  });
});

/* writing page : only use Council*/
router.get('/notice_write', function(req,res,next){
  var name = req.user.name;
  var studentID = req.user.studentID;
  var grade = req.user.grade;
  var datas = [name, studentID, grade];
  res.render('notice_write', {data : datas});
});

router.post('/notice_write/write',upload.array('userfile',10), function(req,res,next){ //이모티콘 저장하는 것 체크하기
//0301 다중
    var title = req.body.title;
    var content = req.body.content;
    var studentID = req.body.studentID;
    var name = req.body.name;
    var grade = req.body.grade;
    var source = req.body.source;
    var date = req.body.date;
    console.log(req.files);
    if(req.files == ""){
      var datas = [title, content, studentID, name, grade, source];
      var sql = "insert into board(number, title, content, studentID, name, grade, source, date)" +
                  " values((select MAX(number)+1 from board a),?,?,?,?,?,?,now())";
    }else{
      var imgPath = req.files[0].originalname;
      for (var i = 1; i < req.files.length; i++)
      {
        var imgPath = imgPath + " " + req.files[i].originalname;
      }
      var datas = [title, content, studentID, name, grade, source, imgPath];
      var sql = "insert into board(number, title, content, studentID, name, grade, source, date, imgPath)" +
                  " values((select MAX(number)+1 from board a),?,?,?,?,?,?,now(),?)";                //board a를 넣어서 오류 뮨제를 해결한다 : select MAX(number)+1 from board a = number의 번호를 최대값 +1 해주는 코드
    }
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
    var sql = "select number, title, content, studentID, name, grade, source, date_format(date, '%Y-%m-%d')date, imgPath from board where number=?";
    conn.query(sql,[number], function(err,rows)
    {
      if (err) console.error("err : " + err);
      console.log(rows);
      if (req.user == null){
      if (!req.user) res.render('notice_read', {logIO_L : 'login', logIO_T : '로그인', row:rows[0]});
      else res.render('notice_read', {logIO_L : 'logout', logIO_T : '로그아웃', row:rows[0]});
    } else{
      if((req.user.id == "k1nder" && req.user.password == "asd123")||(req.user.id == "jung2da" && req.user.password == "jjung2259")||(req.user.id == "vouobb" && req.user.password == "dbwjd0416")){
      if (!req.user) res.render('notice_readDev', {logIO_L : 'login', logIO_T : '로그인', row:rows[0]});
      else res.render('notice_readDev', {logIO_L : 'logout', logIO_T : '로그아웃', row:rows[0]});
      }
    }
    });
});


/*read page : only use Council*/


/* Update page */
router.get('/notice_update/:number', function(req,res,next){
  var number = req.params.number;
  var sql = "select number, title, content, studentID, name, grade, source, date_format(date, '%Y-%m-%d')date, imgPath from board where number=?";
  conn.query(sql,[number], function(err,rows)
  {
      if(err) console.error(err);
     res.render('notice_update',{row:rows[0]});
  });
});

router.post('/notice_update/update',upload.array('userfile', 10), function(req,res,next)
{
  var number = req.body.number;
  var title = req.body.title;
  var content = req.body.content;
  var studentID = req.body.studentID;
  var name = req.body.name;
  var grade = req.body.grade;
  var source = req.body.source;
  var date = req.body.date;
  if(req.files == "" &&req.body.delete == null){//수정시 이미지 변경 X일 때
    console.log('hi1');
    var datas = [title, content, studentID, name, grade, source, number];
      var sql = "update board set title=?, content=?, studentID=?, name=?, grade=?, source=?, date=now() where number=?";
  }else if(req.body.delete != null){ //수정시 이미지 삭제하고 싶을 때
    console.log('hi2');
    var datas = [title, content, studentID, name, grade, source, number];
      var sql = "update board set title=?, content=?, studentID=?, name=?, grade=?, source=?, date=now(), imgPath=null where number=?";
  }
  else{ //수정시 이미지 변경됬을 때
    console.log('hi3');
    var imgPath = req.files[0].originalname;
    for (var i = 1; i < req.files.length; i++)
    {
      var imgPath = imgPath + " " + req.files[i].originalname;
    }
    var datas = [title, content, studentID, name, grade, source, imgPath, number];
    var sql = "update board set title=?, content=?, studentID=?, name=?, grade=?, source=?, date=now(), imgPath=? where number=?";             //board a를 넣어서 오류 뮨제를 해결한다 : select MAX(number)+1 from board a = number의 번호를 최대값 +1 해주는 코드
  }
if(req.body.delete != null) {

}
    conn.query(sql, datas, function(err,result)
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
