//* 내장 모듈 가져오기
const http = require('http');

//* index.html 모듈 가져올 수 있게 file system Fs 변수 생성
const fs = require('fs');

const url = require('url');

const path = require('path');

const contentT = [
  {'Content-Type': 'text/html; charset= utf-8'},
  {'Content-Type': 'text/css; charset= utf-8'},
  {'Content-Type': 'image/jpeg; charset= utf-8'}
];

// const contentType = {
//   'Content-Type': 'text/html; charset = utf-8'
// };

// const express = require('express')
// const app = express()

// app.use(express.static('public'))

//* 서버 생성
const server = http.createServer((request, response) => {
  let pageURL = request.url;
  let pathname = url.parse(pageURL, true).pathname;
//* 메인 페이지 조건문
  if (request.method === 'GET' && request.url === '/') {
    // response.writeHead(200, contentType);
    fs.readFile('index.html', (err, data) => {
      if (err) {
        console.log('호출 에러');
      } else {
        response.writeHead(200, contentT[0]);
        response.end(data);
      }
    });
  }
  //* 강사님 방식(외부 css 값 가져오는 조건문)
  // else if (request.method === 'GET' && request.url === '/style.css') {
  //   // response.writeHead(200, contentType);
  //   fs.readFile('style.css', (err, data) => {
  //     if (err) {
  //       console.log('호출 에러');
  //     } else {
  //       response.writeHead(200, contentT[1]);
  //       response.end(data);
  //     }
  //   });
  // } 
  //* parse를 이용한 외부 css 값 가져오는 조건문
  else if (request.method === 'GET' && pathname === '/style.css') {
    // response.writeHead(200, contentType);
    fs.readFile('style.css', (err, data) => {
      if (err) {
        console.log('호출 에러');
      } else {
        response.writeHead(200, contentT[1]);
        response.end(data);
      }
    });
  }

  //* 폴더네 이미지 파일 가져오는 조건문
  //* startsWith 메서드를 사용하는 이유는 ~로 시작하면 으로 이 폴더로 시작하면 폴더의 파일 이름 값을 가져 올 수 있게 해준다.
  else if (pageURL.startsWith('/public/images/')) {
    console.log(pageURL.startsWith('/public/images/'))
    let imageName = path.basename(pageURL);
    let imagePath = './public/images/' + imageName;
    // response.writeHead(200, contentType);
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.log('호출 에러');
      } else {
        response.writeHead(200, contentT[2]);
        response.end(data);
      }
    });
    //* 기능 페이지 제작
  } else if (request.method === 'GET' && request.url === '/dutchPay') {
    fs.readFile('dutch-pay.html', (err, data) => {
      if (err) {
        console.log('호출 에러');
      } else {
        response.writeHead(200, contentT[0]);
        response.end(data);
      }
    });
  } else if (request.method === 'GET' && pathname === '/dutch-style.css') {
    // response.writeHead(200, contentType);
    fs.readFile('dutch-style.css', (err, data) => {
      if (err) {
        console.log('호출 에러');
      } else {
        response.writeHead(200, contentT[1]);
        response.end(data);
      }
    });
  } 
  else {
    response.writeHead(404, { 'Content-Type': 'text/html; charset= utf-8' });
    // response.writeHead(404, contentType);
    response.end('<h1>요청 페이지를 찾을 수 없습니다</h1>');
  }
});

server.listen(8080, () => {
  console.log('서버 가동중');
});
