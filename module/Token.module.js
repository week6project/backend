require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;

module.exports = {
  refresh: () => {
    const refresh = 'Bearer ' + jwt.sign({}, secretKey, { expiresIn: '7d' });
    return refresh;
  },

  access: (userNo, email) => {
    const payload = { userNo, email };
    const access = 'Bearer ' + jwt.sign(payload, secretKey, { expiresIn: '5m' });
    return access;
  },

  decoded: (req, res) => {
    const { Authorization } = req;
    const [authType, authToken] = (Authorization || '').split(' ');
    const userData = jwt.decode(authToken);
    return userData;
  },
};
