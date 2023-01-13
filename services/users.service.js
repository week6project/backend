const UsersRepository = require('../repositories/users.repository');
const { Users } = require('../models');
const { cipher, loginCipher } = require('../helpers/cipher.helper');
const { refresh, access } = require('../module/Token.module');
const error = new Error();
error.status = {};
const success = {};

class UsersServices {
  usersRepository = UsersRepository(Users);
  signupProcess = async (userId, nickname, email, password) => {
    try {
      const reduplicateUser = await this.usersRepository.reduplicateUser(userId);
      if (reduplicateUser.length) {
        error.status = 412;
        error.data = { errorMessage: '중복된 id입니다.' };
        throw error;
      }
      const cipherPassword = cipher(password);
      const { hashPassword, salt } = cipherPassword;
      const signup = await this.usersRepository.signupProcess(
        userId,
        nickname,
        email,
        hashPassword,
        salt
      );
      success.status = 201;
      success.data = { message: '회원가입에 성공했습니다.' };
    } catch (error) {
      error.status = 400;
      error.data = { errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' };
      return error;
    }
  };

  loginProcess = async (userId, password, res) => {
    try {
      const idInquiry = await this.usersRepository.loginProcess(userId);
      if (!idInquiry) {
        error.status = 404;
        error.data = { errorMessage: '존재하지 않는 아이디 입니다.' };
        throw error;
      }

      const cipherPassword = loginCipher(password, idInquiry.salt);
      if (idInquiry.hashPassword !== cipherPassword) {
        error.status = 412;
        error.data = { errorMessage: '아이디 또는 비밀번호가 일치하지 않습니다.' };
        throw error;
      }

      res.cookie('Authorization', access(userData.nickname, userData.userId));
      res.cookie('refreshAuthorization', refresh());
      success.status = 200;
      success.data = { message: '로그인에 성공했습니다.' };
      return success;
    } catch (error) {
      if (error.status !== 412 || error.status !== 404) {
        error.status = 400;
        error.data = { errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' };
        return error;
      }
      return error;
    }
  };
}
module.exports = UsersServices;
