// const express = require("express");
// const session = require("express-session");
// const passport = require("passport");
// const passportConfig = require("./passport");  // passport/index.js
//
// const app = express();
// app.use(                                 // 기본적인 세션설정
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: "pyh",
//     cookie: {
//       httpOnly: true,
//       secure: false
//     }
//   })
// );
// app.use(express.urlencoded({ extended: false }));  // 클라이언트의 form값을 req.body에 넣음
// app.use(passport.initialize());                    // passport 동작
// app.use(passport.session());                       // passport.deserializeUser 실행
//
// passportConfig(passport);
//
// app.post("/login", (req, res, next) => {
//
//   passport.authenticate("local", (authError, user, info) => { // passport/localStrategy.js를 실행시킵니다.  (1)
//
//     return req.login(user, loginError => {
//       if (loginError) {
//         console.error(loginError);
//       }
//     });
//   })(req, res, next);
//
//   res.redirect("/success");
// });
