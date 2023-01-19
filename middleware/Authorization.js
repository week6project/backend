require('dotenv').config();
const { access } = require('../module/Token.module');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
const error = new Error();

module.exports = async (req, res, next) => {
  /**
   * 헤더에서 받아온 access token (헤더에 들어간 토큰은 대소문자 구분 불가)
   */
  // const { Authorization } = req.cookies;
  const { authorization } = req.headers;
  console.log(
    `-----------------------------------------------------------------------------------------------------------------------------------------------------------------`
  );
  console.log('들어오는 액세스', req.headers.authorization);
  console.log('들어오는 리프래쉬', req.headers.refreshauthorization);
  console.log(
    `-----------------------------------------------------------------------------------------------------------------------------------------------------------------`
  );
  /**
   * Access Token과 함께 발행 된 refreshtoken
   * payload는 담고있지 않다.
   */
  const { refreshauthorization } = req.headers;
  /**
   * 받아온 토큰을 공백을 기준으로 type과 token으로 분해
   */
  const [authType, authToken] = (authorization || '').split(' ');
  try {
    /**
     * 만약 액세스토큰이 없으면 리프레쉬토큰을 확인
     * 리프레쉬도 없으면 정상적인 접근이 아니기에
     * 로그인 필요 메세지 클라이언틀 전달
     */
    if (!authorization) {
      if (!refreshauthorization) {
        return res.status(403).json({
          errorMessage: '로그인이 필요한 기능입니다.',
        });
      }
    }
    /**
     * 액세스토큰은 있지만 리프래쉬토큰이 없으면
     * 이 또한 정상적인 접근이 아니라고 판단 토큰에러 매세지 클라이언트 전달
     */
    if (!refreshauthorization) {
      return res.status(403).json({
        errorMessage: '전달된 리프레쉬토큰에서 오류가 발생했습니다.',
      });
    }
    /**
     * 엑세스토큰이 있을때 검증 절차를 실행 정상적인 검증(true)때는 다음 라우터로 진행
     * 실패 false시에는 error를 내어 catch가 실행되어 다음 스텝 진행
     */
    const AuthorizationVerify = jwt.verify(authToken, secretKey);
    const { userNo, nickname } = AuthorizationVerify;
    next();
    return;
  } catch (error) {
    console.log('토큰 에러 메세지', error.message);
    /**
     * 검증 실패 error 메세지가 'invalid token'이면 정상적이 토큰이 아니라고 판단
     * 에러 메세지 리턴
     */
    if (error.message === 'invalid token') {
      return res.status(403).json({ errorMessage: '전달된 토큰이 불분명합니다. invalid token' });
      /**
       * 검증 실패 error 메세지가 'jwt expired'이면 유효기간이 만료된 액세스 토큰이기 때문에
       * 기존 액세스토큰은 decode하여 payload를 구조분해하여
       * 새로운 액세스토큰에 payload에 넣어주어 새로운 액세스토큰을 발행하여
       * 헤더로 전달해주고 다음 단계로 진행
       */
    } else if (error.message === 'jwt expired') {
      const newAuthorization = jwt.decode(authToken, secretKey);
      const { userNo, nickname } = newAuthorization;
      res.setHeader('authorization', access(userNo, nickname));
      console.log(
        `-----------------------------------------------------------------------------------------------------------------------------------------------------------------`
      );
      console.log('재발급되는 액세스 토큰', access(userNo, nickname));
      console.log(
        `-----------------------------------------------------------------------------------------------------------------------------------------------------------------`
      );
      next();
      return;
    } else {
      return res
        .status(403)
        .json({ Message: '알 수 없는 이유로 전달된 토큰에서 오류가 발생했습니다. unknown error' });
    }
    /**
     *위 에러 사항이 모두 통과하지 못하면 비정상적 토큰이므로, 에러메세지 클라이언트에 전달
     */
  }
};
