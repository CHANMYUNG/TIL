# NPM
[NPMJS 바로가기](https://www.npmjs.com)
여러 JS 독립적인 앱, 모듈 설치 가능
## 사용법
```
1. sudo npm install <moduleName> -g  
글로벌하게 설치함, 컴퓨터 전역에서 사용  
2. sudo npm install <moduleName>  
로컬  
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
