require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = process.env.Port;
const routesConnect = require('./routes/index');
app.use(cookieParser());

app.use(express.json());
app.use('/', routesConnect);

app.listen(port, () => {
  console.log(`${port}`, ': 포트가 실행 되었습니다.');
});
