# NPM
[NPMJS 바로가기](https://www.npmjs.com)  
: 여러 JS 독립적인 앱, 모듈 설치 가능
## 앱 설치 방법
```
1. sudo npm install <appName> -g(해당 앱에 따라 다를 수 있음)  
글로벌하게 설치함, 컴퓨터 전역에서 사용  
2. sudo npm install <appName>(해당 앱에 따라 다를 수 있음)  
로컬  
```
## 모듈 설치
1. 패키지 지정 npm init  
```
name: 이름 지정  
version: 버전 지정  
description: 요약(꼭 적는것을 권장)  
entry point: 어떠한 js파일이 프로젝트를 지정하는 js파일인지 지정(추후 수정 가능)  
test command: tdd라는것을 하게 되었을때 어떠한 명령어로 test할지 지정(생략 가능)  
git repository: Git에 올라간다면 어떤 repository에 올릴지 지정, git repository주소를 적음  
```
2. 모듈 설치
```
sudo npm install <moduleName>(해당 모듈에 따라 다를 수 있음)  
sudo npm install <moduleName> --save(완전한 설치, 해당 모듈에 따라 다를 수 있음)  
```
## 모듈 사용법
```
require('<moduleName>'); // 해당 모듈 객체를 반환함  
```
## 유용한 모듈
1. underscore
- 설치법 :  
```
sudo npm install underscore  
sudo npm install underscore --save  
```
- 설명 : 배열의 값에 쉽게 접근하는 기능, 이 밖에도 많은 기능을 지원함  
[UNDERSCORE 바로가기](http://underscorejs.org/)  
- 사용법 :  
```
var _ = require('underscore');  
var arr = [3,6,9,1,12];  
console.log(arr[0]);  
// 이 밖에도 많은 기능을 지원함  
```
## 유용한 앱
1. uglify
- 설치법 :  
```
1. sudo npm install uglify-js -g  
2. sudo npm install uglify-js  
```
- 설명 :  
코드를 난독화 시킴  

- 사용법 :  
```
uglifyjs <fileName> -o <newFileName>  
: 불필요한 개행을 모두 삭제한 새로운 파일을 만듬  

uglifyjs <fileName> -o <newFileName> -m  
: 변수명을 바꾸어 더욱 난독화 시킴  
```
-----------------------------------------------------
