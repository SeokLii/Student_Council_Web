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
  var rentaldate;
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
  var sql = "select * from rent_a";
  conn.query(sql, function (err, rows) {
    if (err) console.error("err : " + err);
    if (req.user == null){
    if (!req.user) res.render('rent_a', {logIO_L : 'login', logIO_T : '로그인', rows: rows});
    else res.render('rent_a', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows});
  } else{
    if((req.user.id == "k1nder" && req.user.password == "asd123")||(req.user.id == "jung2da" && req.user.password == "jjung2259")||(req.user.id == "vouobb" && req.user.password == "dbwjd0416")){
    if (!req.user) res.render('rent_aDev', {logIO_L : 'login', logIO_T : '로그인', rows: rows});
    else res.render('rent_aDev', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows});
    }
  }
  });
});

router.get('/rent_b', function(req, res, next) { //메인에서 page:1로 넘겨주면 됌

//  var page = req.params.page;
  var sql = "select * from rent_b";
  conn.query(sql, function (err, rows) {
    if (err) console.error("err : " + err);
    if (req.user == null){
    if (!req.user) res.render('rent_b', {logIO_L : 'login', logIO_T : '로그인', rows: rows});
    else res.render('rent_bDev', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows});
  } else{
    if((req.user.id == "k1nder" && req.user.password == "asd123")||(req.user.id == "jung2da" && req.user.password == "jjung2259")||(req.user.id == "vouobb" && req.user.password == "dbwjd0416")){
    if (!req.user) res.render('rent_b', {logIO_L : 'login', logIO_T : '로그인', rows: rows});
    else res.render('rent_bDev', {logIO_L : 'logout', logIO_T : '로그아웃', rows: rows});
    }
  }
  });
});


router.post('/rental', function(req,res,next){
    var check;
    var checknull = req.body;
    var rentmatch = 0;
    var sql = "select * from rent";
    conn.query(sql, function (err, rows) {

    console.log(req.body);

    //rent
    if(checknull.rent)
    {
      //여러 input을 넘겨주면 배열이 되어버리고 , 하나면 변수가 되어버린다.
      //req.body.Borrower의 형태가 달라져서 코드가 엉망이되는 단점이 존재한다.
      if(Array.isArray(req.body.Borrower) == true)
      {
        for (var i = 0; i < Object.keys(req.body.Borrower).length; i++)
        //모든 input칸의 값이 넘어오기 때문에 입력받은 input칸의 값을 구분하기 위해서 탐색 for문을 진행한다.
        {
          check = 0; //중복체크 변수, check > 0, 중복되는 값이 있다는 코드

          //빈 input 태그 발견
          if( req.body.Borrower[i] == "" || req.body.studentID[i] == "")
          {
            console.log("입력되지 않은 Input값을 발견하여 넘깁니다.");
          }

          //입력받은 input 태그 발견
          else
          {
            var Borrower = req.body.Borrower[i];
            var studentID = req.body.studentID[i];
            var id = parseInt(req.body.rent[rentmatch])+1;
            var manager = req.user.name;
            var datas = [Borrower, studentID, manager, id];
            rentmatch++;

            //중복 대여 비교
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

            //대여 저장
            if(check == 0 && Borrower != "")//중복되는 값이 없고, 이름이 존재하면
            {
              var sql2 = "update rent set Borrower=?, studentID=?, manager=?, rentaldate=now(), returndate=null where id=?";
              conn.query(sql2, datas, function(err,result)
              {
                if (err){console.error("err : " + err);}
                console.log("rent에 저장되었습니다.");
              });
              //history 내역추가 해당 rent의 rent 테이블 모두 history로 보낸다.
              var kind = rows[id-1].kind;
              var name = rows[id-1].name;
              var code = rows[id-1].code;

              var datah = [kind, name, code, Borrower, studentID, manager];
              var sqlh = "insert into history(id, kind, name, code, rentaldate, returndate, Borrower, studentID, manager)" +
                          " values((select MAX(id)+1 from history a),?,?,?,now(),null,?,?,?)";
              conn.query(sqlh, datah, function(err,result)
              {
                if (err){console.error("err : " + err);}
                console.log("history에 저장되었습니다.");
              });
              //
            }
            else{
              console.log("저장되지 않았습니다.");
            }
          }
        }
      }
      else
      {
        check = 0;

        var Borrower = req.body.Borrower;
        var studentID = req.body.studentID;
        var id = parseInt(req.body.rent)+1;
        var manager = req.user.name;
        var datas = [Borrower, studentID, manager, id];

        //중복 대여 비교
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
        console.log(check);
        //대여 저장
        if(check == 0 && Borrower != "")//중복되는 값이 없고, 이름이 존재하면
        {
          var sql2 = "update rent set Borrower=?, studentID=?, manager=?, rentaldate=now(), returndate=null where id=?";
          conn.query(sql2, datas, function(err,result)
          {
            if (err){console.error("err : " + err);}
            console.log("저장되었습니다.");
          });
          //history 내역추가 해당 rent의 rent 테이블 모두 history로 보낸다.
          var kind = rows[id-1].kind;
          var name = rows[id-1].name;
          var code = rows[id-1].code;

          var datah = [kind, name, code, Borrower, studentID, manager];
          var sqlh = "insert into history(id, kind, name, code, rentaldate, returndate, Borrower, studentID, manager)" +
                      " values((select MAX(id)+1 from history a),?,?,?,now(),null,?,?,?)";
          conn.query(sqlh, datah, function(err,result)
          {
            if (err){console.error("err : " + err);}
            console.log("history에 저장되었습니다.");
          });
          //
        }
        else{
          console.log("저장되지 않았습니다.");
        }
      }

    }

    //return
    console.log(checknull.return);
    if(checknull.return) //return에 값이 들어온다면
    {
      for (var i = 0; i < Object.keys(req.body.return).length; i++)
      // Object.keys(req.body.return).length => 대여 반납 관련된 갯수
      {
        var Borrower = null;
        var studentID = null;
        var id = parseInt(req.body.return[i])+1;
        console.log(id);
        var manager = null;
        var datas = [Borrower, studentID, manager, id];
        var sql4 = "update rent set Borrower=?, studentID=?, manager=?, rentaldate=null, returndate=now() where id=?";
        conn.query(sql4, datas, function(err,result)
        {
          if (err){console.error("err : " + err);}
        });
        //history 내역추가 해당 rent의 rent 테이블 모두 history로 보낸다.
        var code = rows[id-1].code;

        var datah = code;
        var sqlh = "update history set returndate=now() where code=?";
        conn.query(sqlh, datah, function(err,result)
        {
          if (err){console.error("err : " + err);}
          console.log("history에 저장되었습니다.");
        });
        //
      }
    }
        res.redirect('/rent');
  });
});



router.post('/rental_a', function(req,res,next){
    var check;
    var checknull = req.body;
    var rentmatch = 0;
    var sql = "select * from rent_a";
    conn.query(sql, function (err, rows) {

    console.log(req.body);

    //rent
    if(checknull.rent)
    {
      //여러 input을 넘겨주면 배열이 되어버리고 , 하나면 변수가 되어버린다.
      //req.body.Borrower의 형태가 달라져서 코드가 엉망이되는 단점이 존재한다.
      if(Array.isArray(req.body.Borrower) == true) //배열이면
      {
        for (var i = 0; i < Object.keys(req.body.Borrower).length; i++)
        //모든 input칸의 값이 넘어오기 때문에 입력받은 input칸의 값을 구분하기 위해서 탐색 for문을 진행한다.
        {
          check = 0; //중복체크 변수, check > 0, 중복되는 값이 있다는 코드

          //빈 input 태그 발견
          if( req.body.Borrower[i] == "" || req.body.studentID[i] == "")
          {
            console.log("입력되지 않은 Input값을 발견하여 넘깁니다.");
          }

          //입력받은 input 태그 발견
          else
          {
            var Borrower = req.body.Borrower[i];
            var studentID = req.body.studentID[i];
            var id = parseInt(req.body.rent[rentmatch])+1;
            var manager = req.user.name;
            var datas = [Borrower, studentID, manager, id];
            rentmatch++;

            //중복 대여 비교
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

            //대여 저장
            if(check == 0 && Borrower != "")//중복되는 값이 없고, 이름이 존재하면
            {
              var sql2 = "update rent_a set Borrower=?, studentID=?, manager=?, rentaldate=now(), returndate=null where id=?";
              conn.query(sql2, datas, function(err,result)
              {
                if (err){console.error("err : " + err);}
                console.log("저장되었습니다.");
              });
              //history 내역추가 해당 rent의 rent 테이블 모두 history로 보낸다.
              var kind = rows[id-1].kind;
              var name = rows[id-1].name;
              var code = rows[id-1].code;

              var datah = [kind, name, code, Borrower, studentID, manager];
              var sqlh = "insert into history(id, kind, name, code, rentaldate, returndate, Borrower, studentID, manager)" +
                          " values((select MAX(id)+1 from history a),?,?,?,now(),null,?,?,?)";
              conn.query(sqlh, datah, function(err,result)
              {
                if (err){console.error("err : " + err);}
                console.log("history에 저장되었습니다.");
              });
              //
            }
            else{
              console.log("저장되지 않았습니다.");
            }
          }
        }
      }
      else
      {
        check = 0;

        var Borrower = req.body.Borrower;
        var studentID = req.body.studentID;
        var id = parseInt(req.body.rent)+1;
        var manager = req.user.name;
        var datas = [Borrower, studentID, manager, id];

        //중복 대여 비교
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
        console.log(check);
        //대여 저장
        if(check == 0 && Borrower != "")//중복되는 값이 없고, 이름이 존재하면
        {
          var sql2 = "update rent_a set Borrower=?, studentID=?, manager=?, rentaldate=now(), returndate=null where id=?";
          conn.query(sql2, datas, function(err,result)
          {
            if (err){console.error("err : " + err);}
            console.log("저장되었습니다.");
          });
          //history 내역추가 해당 rent의 rent 테이블 모두 history로 보낸다.
          var kind = rows[id-1].kind;
          var name = rows[id-1].name;
          var code = rows[id-1].code;

          var datah = [kind, name, code, Borrower, studentID, manager];
          var sqlh = "insert into history(id, kind, name, code, rentaldate, returndate, Borrower, studentID, manager)" +
                      " values((select MAX(id)+1 from history a),?,?,?,now(),null,?,?,?)";
          conn.query(sqlh, datah, function(err,result)
          {
            if (err){console.error("err : " + err);}
            console.log("history에 저장되었습니다.");
          });
          //
        }
        else{
          console.log("저장되지 않았습니다.");
        }
      }

    }

    //return
    console.log(checknull.return);
    if(checknull.return) //return에 값이 들어온다면
    {
      for (var i = 0; i < Object.keys(req.body.return).length; i++)
      // Object.keys(req.body.return).length => 대여 반납 관련된 갯수
      {
        var Borrower = null;
        var studentID = null;
        var id = parseInt(req.body.return[i])+1;
        console.log(id);
        var manager = null;
        var datas = [Borrower, studentID, manager, id];
        var sql4 = "update rent_a set Borrower=?, studentID=?, manager=?, rentaldate=null, returndate=now() where id=?";
        conn.query(sql4, datas, function(err,result)
        {
          if (err){console.error("err : " + err);}
        });
        //history 내역추가 해당 rent의 rent 테이블 모두 history로 보낸다.
        var code = rows[id-1].code;

        var datah = code;
        var sqlh = "update history set returndate=now() where code=?";
        conn.query(sqlh, datah, function(err,result)
        {
          if (err){console.error("err : " + err);}
          console.log("history에 저장되었습니다.");
        });
        //
      }
    }
        res.redirect('/rent_a');
  });
});

router.post('/rental_b', function(req,res,next){
    var check;
    var checknull = req.body;
    var rentmatch = 0;
    var sql = "select * from rent_b";
    conn.query(sql, function (err, rows) {

    console.log(req.body);

    //rent
    if(checknull.rent)
    {
      //여러 input을 넘겨주면 배열이 되어버리고 , 하나면 변수가 되어버린다.
      //req.body.Borrower의 형태가 달라져서 코드가 엉망이되는 단점이 존재한다.
      if(Array.isArray(req.body.Borrower) == true) //배열이면
      {
        for (var i = 0; i < Object.keys(req.body.Borrower).length; i++)
        //모든 input칸의 값이 넘어오기 때문에 입력받은 input칸의 값을 구분하기 위해서 탐색 for문을 진행한다.
        {
          check = 0; //중복체크 변수, check > 0, 중복되는 값이 있다는 코드

          //빈 input 태그 발견
          if( req.body.Borrower[i] == "" || req.body.studentID[i] == "")
          {
            console.log("입력되지 않은 Input값을 발견하여 넘깁니다.");
          }

          //입력받은 input 태그 발견
          else
          {
            var Borrower = req.body.Borrower[i];
            var studentID = req.body.studentID[i];
            var id = parseInt(req.body.rent[rentmatch])+1;
            var manager = req.user.name;
            var datas = [Borrower, studentID, manager, id];
            rentmatch++;

            //중복 대여 비교
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

            //대여 저장
            if(check == 0 && Borrower != "")//중복되는 값이 없고, 이름이 존재하면
            {
              var sql2 = "update rent_b set Borrower=?, studentID=?, manager=?, rentaldate=now(), returndate=null where id=?";
              conn.query(sql2, datas, function(err,result)
              {
                if (err){console.error("err : " + err);}
                console.log("저장되었습니다.");
              });
              //history 내역추가 해당 rent의 rent 테이블 모두 history로 보낸다.
              var kind = rows[id-1].kind;
              var name = rows[id-1].name;
              var code = rows[id-1].code;

              var datah = [kind, name, code, Borrower, studentID, manager];
              var sqlh = "insert into history(id, kind, name, code, rentaldate, returndate, Borrower, studentID, manager)" +
                          " values((select MAX(id)+1 from history a),?,?,?,now(),null,?,?,?)";
              conn.query(sqlh, datah, function(err,result)
              {
                if (err){console.error("err : " + err);}
                console.log("history에 저장되었습니다.");
              });
              //
            }
            else{
              console.log("저장되지 않았습니다.");
            }
          }
        }
      }
      else
      {
        check = 0;

        var Borrower = req.body.Borrower;
        var studentID = req.body.studentID;
        var id = parseInt(req.body.rent)+1;
        var manager = req.user.name;
        var datas = [Borrower, studentID, manager, id];

        //중복 대여 비교
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
        console.log(check);
        //대여 저장
        if(check == 0 && Borrower != "")//중복되는 값이 없고, 이름이 존재하면
        {
          var sql2 = "update rent_b set Borrower=?, studentID=?, manager=?, rentaldate=now(), returndate=null where id=?";
          conn.query(sql2, datas, function(err,result)
          {
            if (err){console.error("err : " + err);}
            console.log("저장되었습니다.");
          });
          //history 내역추가 해당 rent의 rent 테이블 모두 history로 보낸다.
          var kind = rows[id-1].kind;
          var name = rows[id-1].name;
          var code = rows[id-1].code;

          var datah = [kind, name, code, Borrower, studentID, manager];
          var sqlh = "insert into history(id, kind, name, code, rentaldate, returndate, Borrower, studentID, manager)" +
                      " values((select MAX(id)+1 from history a),?,?,?,now(),null,?,?,?)";
          conn.query(sqlh, datah, function(err,result)
          {
            if (err){console.error("err : " + err);}
            console.log("history에 저장되었습니다.");
          });
          //
        }
        else{
          console.log("저장되지 않았습니다.");
        }
      }

    }

    //return
    console.log(checknull.return);
    if(checknull.return) //return에 값이 들어온다면
    {
      for (var i = 0; i < Object.keys(req.body.return).length; i++)
      // Object.keys(req.body.return).length => 대여 반납 관련된 갯수
      {
        var Borrower = null;
        var studentID = null;
        var id = parseInt(req.body.return[i])+1;
        var manager = null;
        var datas = [Borrower, studentID, manager, id];
        var sql4 = "update rent_b set Borrower=?, studentID=?, manager=?, rentaldate=null, returndate=now() where id=?";
        conn.query(sql4, datas, function(err,result)
        {
          if (err){console.error("err : " + err);}
        });
        //history 내역추가 해당 rent의 rent 테이블 모두 history로 보낸다.
        var code = rows[id-1].code;

        var datah = code;
        var sqlh = "update history set returndate=now() where code=?";
        conn.query(sqlh, datah, function(err,result)
        {
          if (err){console.error("err : " + err);}
          console.log("history에 저장되었습니다.");
        });
        //
      }
    }
        res.redirect('/rent_b');
  });
});

module.exports = router;
