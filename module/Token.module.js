require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;

module.exports = {
  /**
   * 리프래쉬 토큰 발급
   * @returns 리프래쉬 토큰 리턴
   */
  refresh: () => {
    const refresh = 'Bearer ' + jwt.sign({}, secretKey, { expiresIn: '7d' });
    return refresh;
  },

  /**
   * 액세스 토큰 발급
   * @param {Number} userNo DB저장시 생성된 유저번호 (primaryKey)
   * @param {String} nickname
   * @returns 액세스 토큰 리터
   */
  access: (userNo, nickname) => {
    const payload = { userNo, nickname };
    const access = 'Bearer ' + jwt.sign(payload, secretKey, { expiresIn: '20m' });
    return access;
  },

  /**
   * 들어온 cookie에서 해당 값{userNo, email}을 구조분해할 수 있게 해줌
   * @param {*} req req.cookie
   * @param {*} res
   * @returns AuthAuthorization 과 Barer Type이 제거 된 토큰String
   */
  decoded: (req, res) => {
    const { authorization } = req;
    const [authType, authToken] = (authorization || '').split(' ');
    const userData = jwt.decode(authToken);
    return userData;
  },
};
