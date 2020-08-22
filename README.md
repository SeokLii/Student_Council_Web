# EROOM-Website Project
- 충북대학교 소프트웨어학과 제8대 이룸학생회 홈페이지 개발 프로젝트
- ( Development of the student council website for students in software department. )
![image](https://user-images.githubusercontent.com/43461426/90965873-1cdd0500-e507-11ea-8658-840bddb440c8.png)
<br/>
<br/>
<br/>
<br/>
<br/>  
# 1. 페이지 구성(Page Configuration)
## 홈(Home)
- 홈페이지의 전체적인 모습을 보여주는 메인 페이지로 추천페이지와 공지사항을 한눈에 보여준다.
- ( The main page showing the overall appearance of the homepage shows the recommended page and announcement at a glance. )

## 학생회 소개(Introduce)
- 소프트웨어학과 학생회의 연혁소개, 제8대 이룸학생회 임원 소개, 학생회장 인사항목을 통해서 학생회에 대한 자세한 설명을 해준다.
- ( Introduce the history of the software department student council, introduce the 8th Irum student council executive, and provide a detailed description of the student council through the student council. )

## 공지사항(Notice)
- 총, 전정대, 학과의 모든 공지사항을 학생들이 볼 수 있도록 정보를 전달해준다.
- ( All notices of all kind of departments are provided so that students can see them. )

## 대여(Rent)
- 학생회 공약 중 하나인 전공서적, 보조배터리, 자전거, 담요, 우산 등 다양한 물품을 관리하고, 학생들이 정보를 실시간으로 볼 수 있도록 대여 장부의 정보를 제공한다. 
- ( Manage various items such as major books, auxiliary batteries, bicycles, blankets and umbrellas, one of the student council's pledges, and provide information on rental books so that students can see the information in real time. )

## 로그인(Login)
- 홈페이지 관리를 위해서 관리자 계정으로만 출입이 가능하다. 코로나 바이러스로 인해서 다양한 온라인 공약을 진행함에 있어 사용자 계정도 필요해질 예정이다. 하지만 학생들의 개인정보를 막 다룰 수 없기 때문에, 간단한 본인확인 과정을 통해서 학생들의 계정을 생성하고 배포할 예정입니다. (아니면 회원가입 창을 만들 예정)
- ( Access to the administrator account is allowed only for website management. A user account will also be needed to carry out various online pledges due to the Corona virus. However, since we are not able to handle their personal information, we will create and distribute their accounts through a simple identification process (or we will create a membership window.) )

- 코로나19 바이러스로 인해 온라인을 통해 학생들과 교류할 수 있는 페이지를 개발해 나갈 예정이다. 
- ( We will develop a page where students can interact online due to the Corona19 virus. )
<br/>
<br/>
<br/>
<br/>
<br/>  
# 2. Node.js
## express
- node 개발의 중심적인 라이브러리이다. ( https://expressjs.com/ko/ )
- ( It is a central library of node development. ( https://expressjs.com/ko/ ) )
## supervisor
- 원래는 자바스크립트 코드가 바뀌게 되면 서버를 껏다가 켜줘야하는 번거로움이 발생한다. 이 라이브러리를 설치해두면 자동으로 변경된 내용을 바꿔준다.(=nodemon)
- ( Originally, if JavaScript code is changed, the server has to be turned on at all times. If you install this library, it automatically changes the changes.(=nodemon) )

## cookie-parser
- 요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어이다.
- ( Middleware that helps you easily extract the requested cookies. )

## ejs
- 템플릿 엔진으로 사용법은 JSP와 비슷하며 다른 템플릿 엔진인 jade보다 사용하기에 더 편하다.
- ( Using a template engine is similar to JSP and easier to use than any other template engine, jade. )

## mysql, express-mysql-session
- mysql connecting과 session관리를 위해서 사용한 라이브러리이다.
- ( This library was used for mysql connecting and session management. )

## multer
- 공지사항에서 이미지 업로드를 위해서 사용된 라이브러리이다. 동시에 여러개의 이미지까지 업로드가 가능하다.
- ( Library used to upload images in the notice. You can upload multiple images at the same time. )

       > var upload = multer({ storage: storage });
       > router.post('/notice_write/write',upload.array('userfile',10), function(req,res,next){ 

## passport, passport-local
- 로그인 시 사용자 인증을 위해서 사용한 라이브러리이다. 로그인 개발시 보안을 위해 필수적으로 사용했다.
- ( Library used for user authentication at login. It was used for security when developing logins. )

# 3. Server
## Window Server
- 기존 2달간 개발과 테스트를 하면서 개인 컴퓨터로 서버를 열어 놓고 사용하였으나 전기요금, 컴퓨터 부하 등의 여러 요인들로 인해서 효율적이지 못하다는 결론이 나오게 되었다. DB 관리, 개발하는데 있어서 편하긴 했다.
- ( It was concluded that the server was not efficient due to various factors such as electricity bills and computer loads, although the server was opened and used with a personal computer during development and testing for two months. It was convenient to manage and develop DB. )

## Naver Cloud Platform Centos7
- 서버를 호스팅하기 위해서 찾아보던 중 1년간 무료로 서버를 열 수 있게 서비스 해주는 네이버 클라우드 플랫폿을 찾게 되었다.
- 무료인 만큼 서비스해주는 OS가 별로 없어서 아쉽긴 했지만, 따로 서버를 항상 열어둘 수 있다는 점이 너무 좋았다.
- 하지만 DB 구축하고 개발하는데 있어서 많이 불편함을 느낄 수 있었다. (Github가 없었더라면 생각하고 싶지도 않다.)
- ( While looking to host the server, I found Naver Cloud Flatpot, which provides free one-year service to open the server. )
- ( Although it was a shame that there were not many OSs for service as it was free, I liked that I could always keep the server open. )
- ( But I could feel a lot of discomfort in building and developing DBs. (I don't want to think without Github.) )

## Putty
- Window에서 Centos7로 접속하여 개발하기 위해서, Putty SSH을 이용했다. 
- 개발에 도움을 받은 페이지들을 정리해보았다.
- ( Putty SSH was used to connect and develop Centos7 in Window. )
- ( I organized the pages that were helped with the development. )
    - https://paulgo1111.tistory.com/17 : nodejs
    - https://wookim789.tistory.com/20 : vscode (connect)
    - https://harsik.github.io/linux/2019/09/16/MySQL.html : mysql
<br/>
<br/>
<br/>
<br/>
<br/>   

# 4. 향후 일정
- 따로 React + Node를 이용하여 웹 개발을 진행하고 있고, 완료한 이후에 Vue를 이용해서 기존의 ejs 코드를 변경해볼 예정이다.
- ( We are developing the web using React + Node separately, and after completion, we will change the existing ejs code using Vue. )