require('dotenv').config();
const cors = require('cors');
const express = require('express');
const expressSanitizer = require('express-sanitizer');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.Port;
const HTTPS_Port = process.env.HTTPS_Port;
const routesConnect = require('./routes/index');
const http = require('http');
const https = require('https');
const fs = require('fs');
const options = {
  ca: fs.readFileSync('/etc/letsencrypt/live/codingtestrg.shop/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/codingtestrg.shop/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/codingtestrg.shop/cert.pem'),
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
const server = https.createServer(options, app).listen(HTTPS_Port, () => {
  console.log(`HTTPS 서버가 실행되었습니다.`);
});
