const crypto = require('crypto');
/**
 * 회원가입 단계에서 들어온 평문의 비밀번호를 날짜와 래덤값을 포함한 salt를 합쳐 암호화
 * @param {String} password
 * @returns 로그인시 입력된 비밀번호를 똑같이 암호화 해야하기 때문에 salt를 같이 리턴
 */
exports.cipher = (password) => {
  const salt = Math.round(new Date().valueOf() * Math.random()) + '';
  const hashPassword = crypto
    .createHash('sha512')
    .update(password + salt)
    .digest('hex');
  return { hashPassword, salt };
};

/**
 * 로그인시에 넘어온 비밀번호를 아이디를 조회하면 같이 추출한 salt를 합쳐 비밀번호를 암호화
 * @param {String} password
 * @param {String} salt
 * @returns 암호화 된 비밀번호를 반환하여, 기존 암호화 비밀번호를 비교하는데 사용
 */
exports.loginCipher = (password, salt) => {
  const hashPassword = crypto
    .createHash('sha512')
    .update(password + salt)
    .digest('hex');
  return hashPassword;
};
