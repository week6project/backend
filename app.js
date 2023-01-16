require('dotenv').config();
const express = require('express');
const expressSanitizer = require('express-sanitizer');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.Port;
const httpsPort = process.env.HTTPS_Port;
const routesConnect = require('./routes/index');
const http = require('http');
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('./rootca.key'),
  cert: fs.readFileSync('./rootca.crt'),
};

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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

http.createServer(app).listen(post, () => {
  console.log(`HTTP 서버가 실행되었습니다.`);
});
https.createServer(options, app).listen(httpsPort, () => {
  console.log(`HTTPS 서버가 실행되었습니다.`);
});
