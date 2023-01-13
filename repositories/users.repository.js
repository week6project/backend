class UsersRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }
  reduplicateUser = async (userId) => {
    const reduplicateUserId = await this.usersModel.findAll({
      where: { userId },
    });
    return reduplicateUserId;
  };

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

  loginProcess = async (userId) => {
    const login = await this.usersModel.findOne({
      where: { userId },
    });
    return JSON.parse(JSON.stringify(login));
  };
}

module.exports = UsersRepository;
