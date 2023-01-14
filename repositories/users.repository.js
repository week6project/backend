class UsersRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }
  /**
   * 입력받은 userId를 통해 중복, 존재여부등을 DB와 연결되어 조회
   * @param {String} userId
   * @returns Users Table 안에서 해당 userId 컬럼이 일치하는 모든 행을 리턴
   * userId,nickname,email,hashPassword,salt,
   */
  reduplicateUser = async (userId) => {
    const reduplicateUserId = await this.usersModel.findAll({
      where: { userId },
    });
    return reduplicateUserId;
  };
  /**
   * 입력받은 params들을 Users 테이블에 생성
   * @param {String} userId
   * @param {String} nickname
   * @param {String} email
   * @param {String} hashPassword
   * @param {String} salt
   * @returns 새로 생성된 userNo와 함께 리턴되나 시스템에서는 Boolean으로만 판단
   */
  signupProcess = async (userId, nickname, email, hashPassword, salt) => {
    const signup = await this.usersModel.create({
      userId,
      nickname,
      email,
      hashPassword,
      salt,
    });
    return signup;
  };
  /**
   * 로그인시에 입력한 userId 값이 table에 있는지 확인
   * @param {String} userId
   * @returns userId가 포함된 테이블내에 같은 행에 있는 칼럼들이 모두 리턴됨 (시스템에서 구조분해할당으로 data 이용가능)
   */
  loginProcess = async (userId) => {
    const login = await this.usersModel.findOne({
      where: { userId },
    });
    /**
     * login만 리턴시 알수없는 값으로 나가는 경우에 JSON형태로 변환하면 시스템에서 식별 가능
     */
    return JSON.parse(JSON.stringify(login));
  };

  /**
   * 비밀버호 변경시 시스템 레이어에서 입력받은 params들을 새로 DB에 업데이트 메소드를 이용 수정
   * @param {String} userId
   * @param {String} hashPassword
   * @param {String} salt
   * @returns 수정된 데이터가 출력되나 시스템 계층에서 Boolean으로 판단
   */
  resetProcess = async (userId, hashPassword, salt) => {
    const reset = await this.usersModel.update({ hashPassword, salt }, { where: { userId } });
    console.log(reset);
    return reset;
  };
}

module.exports = UsersRepository;
