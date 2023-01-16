require('dotenv').config();
const env = process.env;
const { decoded } = require('../module/Token.module');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.update({
  AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: env.AWS_REGION,
});

const s3 = new aws.S3();

const s3uploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'gameimage',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const { userNo, nickname } = decoded(req.headers);
      cb(null, `${Date.now()}_${nickname}.jpg`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  ////// S3 프론트 이슈 (크기 해상도 용량, preload)
});

module.exports = s3uploadMiddleware;
