"use strict";
require("dotenv").config;
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "test";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

// 시퀄라이저 로깅 모듈
const moment = require("moment");
const date = moment().format("YYYY[_]MM[_]DD");
const time = moment().format("H:mm:ss");

const dir = "./log/sequelize/";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, {
    // 동기방식 고려
    recursive: true, // 하위 계층 파일 구조 생성 가능
  });
}

// 로그 작성
const log = fs.createWriteStream(dir + `${date}.log`, { flags: "a" });
log.write(`\n\n[${time}]\n`);
config.logging = (msg) => log.write(`[${time}] : ${msg}\n`);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
