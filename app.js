require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.Port;
const routesConnect = require('./routes/index');

app.use(cookieParser());
app.use(express.json());

app.use('/api', routesConnect);

app.listen(port, () => {
  console.log(`${port}`, ': 포트가 실행 되었습니다.');
});
