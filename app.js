var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var flash = require('connect-flash'); // session 관련해서 사용됨. 로그인 실패시 session등 클리어하는 기능으로 보임.

//router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var introduceRouter = require('./routes/introduce');
var noticeRouter = require('./routes/notice');
var logIORouter = require('./routes/logIO');
var calendarIORouter = require('./routes/calendar');
var rentRouter = require('./routes/rent');

var app = express();

//session
app.use(session({
  secret : "",
  resave : false,
  saveUninitialized : true,
  store: new MySQLStore({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'my_db'
  }) //database 에 대한 정보를 넘겨준다. 세션을 사용할 때  mysql에 접근할 수 있게
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//serve-favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico'))); //

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

//passport 미들웨어 장착
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize()); //초기화, passport 동작
app.use(passport.session()); //로그인 지속을 위한 세션 사용, passport.deserializeUser 실행
app.use(flash());

//static 파일 경로설정
app.use('/', express.static(__dirname + '/public'));
app.use('/notice', express.static(__dirname + '/public'));
app.use('/notice_read', express.static(__dirname + '/public'));
app.use('/notice_update', express.static(__dirname + '/public'));

// interlink router (user)
app.use(indexRouter); //Main page
app.use(introduceRouter); //Student Council introduce page
app.use(noticeRouter); // Notice page
app.use(logIORouter); //login page
app.use(calendarIORouter); //calendar page
app.use(rentRouter); //rent page
//app.use('/commitment', commitmentRouter); //Commitment page

// interlink router (manager)
app.use('/users', usersRouter); // manager page

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
