# 웹 서버 만들기
## 웹 서버의 동작 원리
1. 웹 서버가 연결을 대기한다. 이때 포트를 지정한다. **Listen**
2. 클라이언트(웹 브라우저)에서 연결을 요청한다. **Connect**
3. 웹 서버가 연결 요청을 받아들인다. **Accept**
4. 상호간에 데이터를 요청하고 받는다. **Request, Response**
5. 연결을 종료한다 **Close**

## 간단한 웹 서버 만들기
1. http모듈을 로딩한다.
```
var http = require('http');
```
2. 웹 서버 객체를 만든다.  
```
var server = http.createServer();
```
3. 웹 서버 포트를 지정하고 시작해 요청을 대기한다.  
```
var port = 8080;
server.listen(port, function(){
  console.log('웹 서버가 시작되었습니다. : %d', port);
  });
```
4. 서버 이벤트를 등록한다.  
  - 서버 이벤트 목록

  이벤트 이름 | 설명
  ---|---
  connection | 클라이언트가 접속하여 연결이 만들어질 때 발생하는 이벤트
  request | 클라이언트가 요청할 때 발생하는 이벤트
  close | 서버를 종료할 때 발생하는 이벤트

```
// 클라이언트 연결 이벤트 처리
server.on('connection', function(socket){
  var addr = socket.address();
  console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
  });

// 클라이언트 요청 이벤트 처리
server.on('request', function(req, res){
  console.log('클라이언트 요청이 들어왔습니다.');
  // 이 밖에 처리할 코드 작성
  });

// 서버 종료 이벤트 처리
server.on('close', function(){
  console.log('서버가 종료됩니다.');
  // 이 밖에 처리할 코드 작성
  });
```

5. 종합
```
// http 모듈 로딩
var http = require('http');

// 웹 서버 객체를 생성
var server = http.createServer();

// 웹 서버 포트를 지정하고 시작해 요청을 대기
var port = 8080;
server.listen(port, function(){
  console.log('웹 서버가 시작되었습니다. : %d', port);
  });

// 클라이언트 연결 이벤트 처리
server.on('connection', function(socket){
  var addr = socket.address();
  console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
  });

// 클라이언트 요청 이벤트 처리
server.on('request', function(req, res){
  console.log('클라이언트 요청이 들어왔습니다.');
  // 이 밖에 처리할 코드 작성
  });

// 서버 종료 이벤트 처리
server.on('close', function(){
  console.log('서버가 종료됩니다.');
  // 이 밖에 처리할 코드 작성
  });
```
