require("dotenv").config();
const env = process.env;
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.update({
  AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: env.AWS_REGION,
});
const { decoded } = require('../module/Token.module');
const s3 = new aws.S3();
<<<<<<< HEAD
const userNo = 1;
const nickname = "abc";
=======
>>>>>>> 83779b3b88813c53a476a817cabc1f1b8176f190

const s3uploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: "gameimage",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
<<<<<<< HEAD
      cb(null, `${Date.now()}_${"hello"}`);
=======
      ////여기 닉네임 UTF -8 인코딩 해야함
      const { userNo, nickname } = decoded(req.cookies);
      cb(null, `${Date.now()}_${decodeURI(nickname)}_${userNo}`);
>>>>>>> 83779b3b88813c53a476a817cabc1f1b8176f190
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = s3uploadMiddleware;
