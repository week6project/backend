const UsersServices = require('../services/users.service');

/** 클라이언트에서 넘어온 user관련 API는 해당 method로 분기처리되어 진행 */
class UsersController {
  usersServices = new UsersServices();
  signupProcess = async (req, res) => {
    const { userId, nickname, email, password } = await req.body;
    const signup = await this.usersServices.signupProcess(userId, nickname, email, password);
    return res.status(signup.status).json(signup.data);
  };

  loginProcess = async (req, res) => {
    const { userId, password } = await req.body;
    const login = await this.usersServices.loginProcess(userId, password, res);
    return res.status(login.status).json(login.data);
  };

  resetProcess = async (req, res) => {
    const { userId, email, password } = await req.body;
    const reset = await this.usersServices.resetProcess(userId, email, password);
    return res.status(reset.status).json(reset.data);
  };
}
module.exports = UsersController;
