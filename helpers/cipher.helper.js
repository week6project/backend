const crypto = require('crypto');

exports.cipher = (password) => {
  const salt = Math.round(new Date().valueOf() * Math.random()) + '';
  const hashPassword = crypto
    .createHash('sha512')
    .update(password + salt)
    .digest('hex');
  return { hashPassword, salt };
};
exports.loginCipher = (password, salt) => {
  const hashPassword = crypto
    .createHash('sha512')
    .update(password + salt)
    .digest('hex');
  return hashPassword;
};
