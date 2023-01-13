const UsersServices = require('../services/users.service');

class UsersController {
  usersServices = new UsersServices();
  signupProcess = async (req, res) => {
    const { userId, nickname, email, password } = await req.body;
    const signup = await this.usersServices.signupProcess(userId, nickname, email, password);
    return res.status(signup.status).json(signup.data);
  };

  loginProcess = async (req, res) => {
    const { userId, password } = await req.body;
    const login = await this.usersServices.loginProcess(userId, password);
    return res.status(login.status).json(login.data);
  };
}
module.exports = UsersController;
