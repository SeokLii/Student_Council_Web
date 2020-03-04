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

/* Board List page */
router.get('/rent', function(req, res, next) { //메인에서 page:1로 넘겨주면 됌
  var sql = "select * from rent";
  conn.query(sql, function (err, rows) {
    if (err) console.error("err : " + err);
    if (req.user == null){
    if (!req.user) res.render('rent', {logIO_L : 'login', logIO_T : '로그인', rows: rows});
    else res.render('rent', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows});
  } else{
    if((req.user.id == "k1nder" && req.user.password == "asd123")||(req.user.id == "jung2da" && req.user.password == "jjung2259")||(req.user.id == "vouobb" && req.user.password == "dbwjd0416")){
    if (!req.user) res.render('rentDev', {logIO_L : 'login', logIO_T : '로그인', rows: rows});
    else res.render('rentDev', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows});
    }
  }
  });
});

router.get('/rent_a', function(req, res, next) { //메인에서 page:1로 넘겨주면 됌

//  var page = req.params.page;
  var sql = "select * from rent";
  conn.query(sql, function (err, rows) {
    if (err) console.error("err : " + err);
    if (req.user == null){
    if (!req.user) res.render('rent_a', {logIO_L : 'login', logIO_T : '로그인', rows: rows});
    else res.render('rent_a', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows});
  } else{
    if((req.user.id == "k1nder" && req.user.password == "asd123")||(req.user.id == "jung2da" && req.user.password == "jjung2259")||(req.user.id == "vouobb" && req.user.password == "dbwjd0416")){
    if (!req.user) res.render('rent_a', {logIO_L : 'login', logIO_T : '로그인', rows: rows});
    else res.render('rent_a', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows});
    }
  }
  });
});

router.get('/rent_b', function(req, res, next) { //메인에서 page:1로 넘겨주면 됌

//  var page = req.params.page;
  var sql = "select * from rent";
  conn.query(sql, function (err, rows) {
    if (err) console.error("err : " + err);
    if (req.user == null){
    if (!req.user) res.render('rent_b', {logIO_L : 'login', logIO_T : '로그인', rows: rows});
    else res.render('rent_b', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows});
  } else{
    if((req.user.id == "k1nder" && req.user.password == "asd123")||(req.user.id == "jung2da" && req.user.password == "jjung2259")||(req.user.id == "vouobb" && req.user.password == "dbwjd0416")){
    if (!req.user) res.render('rent_b', {logIO_L : 'login', logIO_T : '로그인', rows: rows});
    else res.render('rent_b', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows});
    }
  }
  });
});


router.post('/rental', function(req,res,next){
    var check = 0;
    var checknull = req.body;

    var sql = "select Borrower, studentID from rent";
    conn.query(sql, function (err, rows) {
    console.log(req.body);
    if(checknull.rent)
    {
      for (var i = 0; i < Object.keys(req.body.rent).length; i++)
      {
          var Borrower = req.body.Borrower[i];
          var studentID = req.body.studentID[i];
          var id = parseInt(req.body.rent[i])+1;
          console.log(id);
          var manager = req.user.name;
          var datas = [Borrower, studentID, manager, id];

          for(var j=0; j<rows.length; j++)
          {
            var CPBorrower = rows[j].Borrower;
            var CPstudentID = rows[j].studentID;
            if(Borrower == CPBorrower || studentID == CPstudentID)
            {
              console.log("중복되는 대여 항목이 존재합니다.");
              check++;
            }
          }

          if(check == 0 && Borrower != "")
          {
            var sql2 = "update rent set Borrower=?, studentID=?, manager=?, rentaldate=now(), returndate=null where id=?";
            conn.query(sql2,datas, function(err,result)
            {
              if (err){console.error("err : " + err);}
            });
            //history 내역추가 해당 rent의 rent 테이블 모두 history로 보낸다.
          }
          else{
            console.log("저장되지 않았습니다.");
          }
      }
    }
    console.log(checknull.return);
    if(checknull.return)
    {
      for (var i = 0; i < Object.keys(req.body.return).length; i++)
      {
        var Borrower = null;
        var studentID = null;
        var id = parseInt(req.body.return[i])+1;
        console.log(id);
        var manager = null;
        var datas = [Borrower, studentID, manager, id];
        var sql4 = "update rent set Borrower=?, studentID=?, manager=?, rentaldate=null, returndate=now() where id=?";
        conn.query(sql4,datas, function(err,result)
        {
          if (err){console.error("err : " + err);}
        });
      }
    }
        res.redirect('/rent');

  });
});


module.exports = router;
