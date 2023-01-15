const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
// aws.config.loadFromPath(__dirname + '/../config/s3.js');

const s3 = new aws.S3();
// const { userNo, nickname } = req.locals;
const s3uploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'gameimage',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${userNo + nickname}`);
    },
  }),
});
module.exports = s3uploadMiddleware;
