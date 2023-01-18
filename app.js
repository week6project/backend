require('dotenv').config();
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const express = require('express');
// http2를 사용하기 위한 조치
const http2Express = require('http2-express-bridge');
const expressSanitizer = require('express-sanitizer');
const cookieParser = require('cookie-parser');
// http2를 사용하기 위한 조치
const app = http2Express(express);

// const app = express()
const port = process.env.Port;
const HTTPS_Port = process.env.HTTPS_Port;
const routesConnect = require('./routes/index');

const http = require('http');
const https = require('https');

/// http2를 사용하기 위한 조치
const http2 = require('http2');
const fs = require('fs');
const options = {
  ca: fs.readFileSync('/etc/letsencrypt/live/codingtestrg.shop/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/codingtestrg.shop/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/codingtestrg.shop/cert.pem'),
  allowHTTP1: true,
};

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
/// cors 옵션
// app.get('/', (req, res) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
// });
// const whitelist = ['http://localhost:3000'];
const corsOption = {
  origin: 'http://localhost:3000',
  // allowHeaders: ['Authorization', 'refreshAuthorization'],
  exposedHeaders: ['Authorization', 'refreshAuthorization'],
  credentials: true,
};

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(expressSanitizer());
/// DDOS 공격 방지 접속 제한 (현재 1분에 10회로 제한 )
////https://www.npmjs.com/package/express-rate-limit
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, /// 1분 (밀리세컨드) type : number
    max: 10, /// 최대 3번의  type : number || function def : 5  if 0 unlimit
    delayMs: 1000, // 딜레이 1초
    standardHeaders: true, // 문제 발생시 헤더로 보냄
    legacyHeaders: false, //  버전문제시 X-RateLimit-Limit 제한,
    statusCode: 429,
    message: 'Too Many account created from this IP',
  })
);
app.use(express.urlencoded({ extended: true }));
app.use('/api', routesConnect);

// error Hanlder
app.use(function (err, req, res, next) {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ err });
  }
  console.log(`🐞 err: ${err}`);
  return res.status(500).send({ message: 'errCatcher: 무언가 잘못되었습니다.' });
});

http.createServer(app).listen(port, () => {
  console.log(`HTTP 서버가 실행되었습니다.`);
});

// https.createSecureServer(options, app).listen(HTTPS_Port, () => {
//   console.log(`HTTP2 서버가 실행되었습니다.`);
// });

http2.createSecureServer(options, app).listen(HTTPS_Port, () => {
  console.log(`HTTP2 서버가 실행되었습니다.`);
});
