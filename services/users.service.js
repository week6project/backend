const UsersRepository = require('../repositories/users.repository');
const { Users } = require('../models');
const { cipher, loginCipher } = require('../helpers/cipher.helper');
const { refresh, access } = require('../module/Token.module');
const error = new Error();
error.status = {};
const success = {};

class UsersServices {
  usersRepository = new UsersRepository(Users);
  signupProcess = async (userId, nickname, email, password) => {
    try {
      /**
       * 유저 중복 검사
       * .length가 없으면 false로 중복되는 회원이 없는 것
       * .length가 있으면 true로 중복되는 회원이 있는 것
       */
      const reduplicateUser = await this.usersRepository.reduplicateUser(userId);
      if (reduplicateUser.length) {
        error.status = 412;
        error.data = { errorMessage: '중복된 id입니다.' };
        throw error;
      }
      /**
       * 비밀번호 암호화 salt는 내부에서 날짜기준 Random한 값을 부여하기 때문에,
       * 같이 꺼내주어 DB에 저장하여야 추후에 비밀번호 incode시 사용할 수 있음
       */
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
      return success;
    } catch (error) {
      console.log(error);
      if (error.status !== 412) {
        error.status = 400;
        error.data = { errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' };
        return error;
      }
      return error;
    }
  };

  loginProcess = async (userId, password, res) => {
    try {
      /**
       * 입력받은 userId를 조회하여 존재유무 확인
       */
      const idInquiry = await this.usersRepository.loginProcess(userId);
      if (!idInquiry) {
        error.status = 404;
        error.data = { errorMessage: '존재하지 않는 아이디 입니다.' };
        throw error;
      }
      /**
       * 입력받은 평문 password를 저장되어있는 salt와 합쳐 incode하여
       * 저장 되어있는 암호화 비밀번호와 비교하여 일치여부 확인
       */
      const cipherPassword = loginCipher(password, idInquiry.salt);
      if (idInquiry.hashPassword !== cipherPassword) {
        error.status = 412;
        error.data = { errorMessage: '아이디 또는 비밀번호가 일치하지 않습니다.' };
        throw error;
      }
      /**
       * userId, password 일치여부 확인 되면 idInquiry에서 추출한 userNo와 nickname으로
       * access / refresh token 발행
       * 해당 토큰은 쿠키형태로 프론트에 넘김
       */
      res.cookie('Authorization', access(idInquiry.userNo, idInquiry.nickname));
      res.cookie('refreshAuthorization', refresh());
      success.status = 200;
      success.data = { message: '로그인에 성공했습니다.' };
      return success;
    } catch (error) {
      console.log(error);
      if (error.status !== 404 && error.status !== 412) {
        error.status = 400;
        error.data = { errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' };
        return error;
      }
      return error;
    }
  };
  /**
   * 비밀번호 분실시 혹은 변경시 해당 input 값으로 비밀번호 변경
   * @param {String} userId
   * @param {String} email
   * @param {String} password
   * @returns 해당 method의 status 및 message 리턴
   */
  resetProcess = async (userId, email, password) => {
    try {
      /**
       * 입력받은 userId 및 email중 저장되어있는 data와
       * 하나라도 일치하지 않으면 변경 불가
       */
      const idInquiry = await this.usersRepository.loginProcess(userId);
      if (email !== idInquiry.email || userId !== idInquiry.userId) {
        error.status = 412;
        error.data = { errorMessage: '입력하신 정보가 일치하지 않습니다.' };
        throw error;
      }
      /**
       * userId 및 email이 일치한다면
       * 입력받은 평문의 password를 새로운 random salt와 incode 하여
       * 새로운 값의 암호화 password 생성
       */
      const cipherPassword = cipher(password);
      const { hashPassword, salt } = cipherPassword;
      const resetPassword = await this.usersRepository.resetProcess(userId, hashPassword, salt);
      success.status = 200;
      success.data = { message: '비밀번호를 변경하였습니다.' };
      return success;
    } catch (error) {
      if (error.status !== 412) {
        error.status = 400;
        error.data = { errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' };
        return error;
      }
      return error;
    }
  };
}
module.exports = UsersServices;
