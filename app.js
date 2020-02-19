const express = require('express'); // express 모듈 추가하기
const http = require('http');
const path = require('path');

const hostname = '192.168.1.149'
const app = express();
const port = 80;

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, hostname, function(err) {
  console.log(`Server running at http://${hostname}:${port}/`);
  if (err) {
    return console.log('Found error - ', err);
  }
});
