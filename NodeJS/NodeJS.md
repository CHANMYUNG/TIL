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
2. path
- 설명 : 파일 패스를 다룸  
- 사용법 :  
  * 메소드 :
  ```
  join() : 여러 개의 이름들을 모두 합쳐 하나의 파일 패스로 만들어 줌  
           파일 패스를 완성할 때 구분자 등을 알아서 조정  
  dirname() : 파일 패스에서 디렉터리 이름을 반환  
  basename() : 파일 패스에서 파일의 확장자를 제외한 이름을 반환  
  extname() : 파일 패스에서 파일의 확장자를 반환
  ```
  * 예제 :  
  ```
  var path = require('path');  

  // 디렉터리 이름 합치기  
  var directories = ["users", "mike", "docs"];  
  var docsDirectory = directories.join(path.sep);  

  // 디렉터리 이름과 파일 이름 합치기  
  var curPath = path.join('/users/mike','notepad.exe');  
  ```
3. url
- 설명 : 일반 주소 문자열을 URL 객체로 만들거나 URL객체를 일반 문자열로 변환하는 일을 함  
- 사용법 :
  * 메소드 :  
  ```
  parse() : 주소 문자열을 파싱해 URL 객체로 만들어 줌  
  format() : URL 객체를 주소 문자열로 변환  
  ```
  * 예제 :  
  ```
  const url = require('url');  

  var URL = url.parse('http://www.naver.com'); // parse : 문자열을 url객체로 변환  
  URL.port = 8080; // URL객체의 port를 8080으로 바꿈  
  var stringURL = url.format(URL); // format : url객체를 문자열로  


  console.dir(URL); // url 객체 'URL'의 모든 속성을 출력  
  console.log(stringURL);  
  ```
4. querystring  
- 설명 : 요청 파라미터를 분리  
- 사용법 :  
  * 메소드 :  
  ```
  parse() : 요청 파라미터 문자열을 파싱해 요청 파라미터 객체로 만들어 줌  
  stringify() : 요청 파라미터 객체를 문자열로 변환함  
  ```
  * 예제 :  
  ```
  const url = require('url');  

  var URL = url.parse('https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty');  

  const querystring = require('querystring');  

  var param = querystring.parse(URL.query); // 요청 파라미터 문자열을 파싱해 요청 파라미터 객체로 만들어 반환  
  var paramString = querystring.stringify(param); // 요청 파라미터 객체를 문자열로 변환  

  console.log(param.query);  
  console.log(paramString);  
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
# 자바스크립트의 객체와 함수 이해
## 변수
### 개념
자바스크립트는 여타 다른 언어들과는 다르게 따로 변수타입을 지정하지 않음  
즉, var이라는 키워드로 변수를 선언하면 이 변수는 그 어떤 자료형이라도 모두 담을 수 있음, 객체와 함수도 예외는 아님  
하지만 **var형 변수 안에 들어가는 값에 따라 차지하는 공간은 다를 수 있음**  
```
Boolean : [기본 자료형] true와 false의 두 가지 값을 가지는 자료형
Number : [기본 자료형] 64비트 형식의 IEEE 754 값이며 정수나 부동소수 값을 가지는 자료형
String : [기본 자료형] 문자열 값을 가지는 자료형, 문자열은 큰따옴표("") 또는 작은따옴표('')사용해 표기  
undefined : 값을 할당하지 않은 변수의 값
null : 존재하지 않는 값을 가리키는 값
Object : 객체를 값으로 가지는 자료형
        객체는 속성들을 담고 있는 가방(Collection)으로 볼 수 있으며, 대표적인 객체로 Array나 Date를 들 수 있음
```
### var자료형 예제 :
```
var age = 20;
console.log('나이 : %d', age);

var name = '소녀시대';
console.log('이름 : %s', name);
```

**객체 안에 들어 있는 속성의 이름은 하나의 변수로 생각할 수 있으며, 접근은 . 또는 []두가지 방식으로 할 수 있다.**  
### 객체 내 속성 접근 예제 :
```
var Person = {};

Person['age'] = 20;
Person['name'] = '소녀시대';
Person.mobile = '010-1234-5678';

console.log('나이 : %d', Person.age);
console.log('이름 : %s', Person.name);
console.log('전화 : %s', Person['mobile']);
```
-----------------------------------------------------
