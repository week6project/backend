const UsersServices = require("../services/users.service");
const {
  signupForm,
  loginForm,
  resetForm,
} = require("../helpers/checkForm.helper");

/** 클라이언트에서 넘어온 user관련 API는 해당 method로 분기처리되어 진행 */
class UsersController {
  usersServices = new UsersServices();

  signupProcess = async (req, res) => {
    const resultSchema = await signupForm(req.body, res);
    console.log(resultSchema);
    if (resultSchema.status) {
      console.log(resultSchema.status);
      return res.status(resultSchema.status).json(resultSchema.message);
    }
    const { userId, nickname, email, password } = await req.body;
    const signup = await this.usersServices.signupProcess(
      userId,
      nickname,
      email,
      password
    );
    return res.status(signup.status).json(signup.data);
  };

  loginProcess = async (req, res) => {
    const resultSchema = await loginForm(req.body, res);
    if (resultSchema.status) {
      return res.status(resultSchema.status).json(resultSchema.message);
    }
    const { userId, password } = await req.body;
    const login = await this.usersServices.loginProcess(userId, password, res);
    return res.status(login.status).json(login.data);
  };

  resetProcess = async (req, res) => {
    const resultSchema = await resetForm(req.body, res);
    if (resultSchema.status) {
      return res.status(resultSchema.status).json(resultSchema.message);
    }
    const { userId, email, password } = await req.body;
    const reset = await this.usersServices.resetProcess(
      userId,
      email,
      password
    );
    return res.status(reset.status).json(reset.data);
  };
}
module.exports = UsersController;
