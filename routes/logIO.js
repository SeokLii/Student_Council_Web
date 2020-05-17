var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var mysql_odbc = require('./database/database_conn')();
var conn = mysql_odbc.init();
var router = express.Router(); //라우터 분리

var app = express();


// parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//미들웨어 장착
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize()); //초기화, passport 동작
app.use(passport.session()); //로그인 지속을 위한 세션 사용, passport.deserializeUser 실행

//Session 관리
//로그인 성공하면 세션에 저장
passport.serializeUser(function(user, done) {
  //console.log('serialize');
  done(null, user.id);
});
//로그인 되어있을 때, 모든 페이지 접근 시 발생, 정보를 찾아 http req로 정보 리턴한다.
passport.deserializeUser(function(id, done) {
  var sql = "select * from user where id = ?"
  conn.query(sql, [id], function (err, rows) {
    if (err) return done(err, false);
    if (!rows[0]) return done(err, false);
    return done(null, rows[0]);
  });
});

//LocalStrategy
//비밀번호 확인하고 맞으면 deserializeUser로 정보 보내서 저장
passport.use('local', new LocalStrategy({
  usernameField: 'userid',
  passwordField: 'password',
  passReqToCallback : true
  },
  function(req, userid, password, done) {
    var sql = "select * from user where id=? and password=?";
    conn.query(sql, [userid, password], function (err, rows) {//
      if (err) return done(err);
      if (rows.length)
      {
        return done(null, { id: userid });
      } else
      {
        return done(null, false, { message: '아이디 혹은 비밀번호가 틀립니다.' })//bcrypt 추가하기
      }
    })
  }
));
  //   var user = conn.query(sql, [userid, password], function (err, user) {//
  //     var data = user[0];
  //     console.log(data);
  //     if (err) return done(err);
  //     if (datas.length) //already login
  //     {
  //       console.log('existed user');
  //       return done(null, false, { message: 'your email is already used' });
  //     } else
  //     {
  //       //id만 맞을 때
  //       //pw만 맞을 때
  //
  //     }
  //   })//
  // }



    //     var data = user[0];
    //     console.log(data.id);
          // if (!user.id){
          //   console.log(user);
          //   return done(null, false, { message: 'Incorrect username.' });
          // }
          // if (!user.password){
          //   console.log(user.password);
          //   return done(null, false, { message: 'Incorrect password.' });
          // }
    // });
    // console.log('dad');
    // return done(null, user);
    //
    // if(userid=='hello' && password=='world'){
    //      var user = { 'userid':'hello',
    //                    'email':'hello@world.com'};
    //      return done(null,user);
    //  }else{
    //      return done(null,false);
    //  }
//));

router.get('/login', function(req, res, next){
    if (!req.user) res.render('login', {logIO_L : 'login', logIO_T : '로그인'});
    else res.render('login', {logIO_L : 'logout', logIO_T : '로그아웃'});
});

//로그인 성공과 실패 시 Routing
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true}),
  // 인증 실패 시 401 리턴, {} -> 인증 스트레티지
  // failureRedirect, successRedirect -> callback function or redirect  두가지 방법
  function (req, res) {
    res.redirect('/login_success');
  });

router.get('/login_success', function(req, res, next){
  var sql = "select number, title, content, studentID, name, grade, source, date_format(date, '%Y-%m-%d')date, imgPath from board";
  conn.query(sql, function (err, rows) {
  res.render('index', { logIO_L : 'logout', logIO_T : '로그아웃', rows : rows, length : rows.length-1, pagenum: rows.length-16, pass: true });
  });
});

router.get('/logout', function(req, res, next){
   req.logout();
   req.session.save(function(err){
     if (err) return console.log(err);
     var sql = "select number, title, content, studentID, name, grade, source, date_format(date, '%Y-%m-%d')date, imgPath from board";
     conn.query(sql, function (err, rows) {
     res.render('index', { logIO_L : 'login', logIO_T : '로그인', rows: rows, length: rows.length-1, pagenum: rows.length-16, pass: true });

    });
   });
});



module.exports = router;
