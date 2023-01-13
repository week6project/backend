require('dotenv').config();
const { access } = require('../module/Token');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
const error = new Error();

module.exports = async (req, res, next) => {
  console.log(req.cookies);

  const { Authorization } = req.cookies;
  const { refreshAuthorization } = req.cookies;

  const [authType, authToken] = (Authorization || '').split(' ');
  const [refType, refToken] = (refreshAuthorization || '').split(' ');
  try {
    if (!Authorization) {
      if (!refreshAuthorization) {
        return res.status(403).json({
          errorMessage: '로그인이 필요한 기능입니다.',
        });
      }
    }
    if (!refreshAuthorization) {
      return res.status(403).json({
        errorMessage: '전달된 쿠키에서 오류가 발생했습니다.',
      });
    }
    const AuthorizationVerify = jwt.verify(authToken, secretKey);
    const refreshAuthorizationVerify = jwt.verify(refToken, secretKey);
    return next();
  } catch (error) {
    console.log(error);
    if (error.message === 'invalid token') {
      return res.status(403).json({ errorMessage: '전달된 쿠키에서 오류가 발생했습니다.' });
    } else if (error.message === 'jwt expired') {
      const newAuthorization = jwt.decode(authToken, secretKey);
      const { nickname, userId } = newAuthorization;
      res.cookie('Authorization', access(nickname, userId));
      return next();
    } else {
      return res.status(403).json({ Message: '전달된 쿠키에서 오류가 발생했습니다.' });
    }
  }
};
