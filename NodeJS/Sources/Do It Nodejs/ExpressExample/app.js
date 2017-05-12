// Express 기본 모듈 불러오기
var express = require('express');
var http  = require('http');
var path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var static = require('serve-static');

// Express 객체 생성
var app = express();

// CookieParser 객체 생성
var cookieParser = require('cookie-parser');


// 기본 속성 설정
app.set('port',process.env.PORT || 8080);

// body-parser를 사용해 application/x-www-form-unlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use(static(path.join(__dirname, 'public')));

/*
// 미들웨어에서 파라미터 확인
app.use(function(req,res,next){
    console.log('첫 번째 미들웨어에서 요청을 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.pw || req.query.pw;

    res.writeHead('200',{'Content-Type' : 'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p>Param id : '+ paramId + '</p></div>');
    res.write('<div><p>Param password : '+paramPassword+ '</p></div>');
    res.end();
});
*/
// cookieParser 사용
app.use(cookieParser()); 

var router = express.Router();
router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 호출됨');

    res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function(req,res){
    console.log('swag');

    // 쿠키 설정
    res.cookie('user',{
        id : 'mike',
        name : '소녀시대',
        authorized : true
    });

    // redirect로 응답
    res.redirect('/process/showCookie');
});
router.route('/process/login').post(function(req,res){
    console.log('/process/login 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.pw || req.query.pw;
    if(req.body.id != 123123){
        res.redirect('/login2.html');
        console.log('redirected');
        res.end();
    }
    else{
    res.writeHead('200',{'Content-Type' : 'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p>Param id : '+ paramId + '</p></div>');
    res.write('<div><p>Param password : '+paramPassword+ '</p></div>');
    res.end();
    }
});
app.use('/',router);

app.all('*',function(req,res){
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

// Express 서버 시작 
http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 서버를 시작했습니다. ' + app.get('port'));
});

