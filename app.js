//* 내장 모듈 가져오기
const http = require('http');

//* index.html 모듈 가져올 수 있게 file system Fs 변수 생성
const fs = require('fs');

const contentType = {
  'Content-Type': 'text/html',
  charset: 'utf-8',
};

//* 서버 생성
const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/') {
    // console.log(response.writeHead);
    // fs.readFile('index.html', (err, data) => {
    //   if (err) {
    //     console.log('호출 에러');
    //   } else {
    //     response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    //     response.end(data);
    //   }
    // });
  }
  if (request.method === 'GET' && request.url === '/sub') {
    response.writeHead(200, contentType);
    fs.readFile('dutch-pay.html', (errs, datas) => {
      if (errs) {
        console.log('호출 에러');
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        response.end(datas);
      }
    });
  } else {
    response.writeHead(404, contentType);
    response.end('<h1>요청 페이지를 찾을 수 없습니다</h1>');
  }
});

server.listen(8080, () => {
  console.log('서버 가동중');
});
