# simple-nodejs-bbs

## 설치

```
npm install express --save
npm install mongoose --save
npm install body-parser --save
npm install nodemon --save-dev
npm install bcrypt --save
npm install jsonwebtoken --save
npm install cookie-parser --save
npm install core --save
npm install concurrently --save
```
- --save: package.json에 반영됩니다.


```
npm install -g nodemon
```

## Client

client 디렉토리로 이동.
```
npx create-react-app .
npm install react-router-dom --save
npm install axios --save
```


```
npm run start
```


## 실행


__클라이언트 실행__
```
npm run start
```
- start 스크립트 다음에 실행이된다.


__서버 실행__

```
npm run backend
```

__한번에 실행__

```

```


## Test Json

### login, logout

``` json
{
	"email": "1234@naver.com",
	"password": "123456"
}
```

## Register

``` json
{
	"name": "test-name1",
	"email": "123@naver.com",
	"password": "123456"
}
```


## 참고 링크

- https://www.youtube.com/watch?v=6kpEtyi2qZY&list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T&index=18
- https://github.com/KoEonYack/Nodejs-Practice-Private/blob/master/StudyNote.md
- [CORS 이슈 해결](https://velog.io/@wlsdud2194/cors)