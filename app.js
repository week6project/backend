require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.Port;
const routesConnect = require("./routes/index");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cookieParser());
app.use(express.json());

app.use("/api", routesConnect);

// error Hanlder
app.use(function (err, req, res, next) {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ err });
  }
  console.log(`🐞 err: ${err}`);
  return res
    .status(500)
    .send({ message: "errCatcher: 무언가 잘못되었습니다." });
});

app.listen(port, () => {
  console.log(`${port}`, ": 포트가 실행 되었습니다.");
});
