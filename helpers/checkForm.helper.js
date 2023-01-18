const Joi = require("joi");
const error = new Error();
error.status = {};

exports.signupForm = (req, res) => {
  const checkuserId = /^[a-zA-Z0-9]{3,10}$/;
  const checkPassword = /^[a-zA-Z0-9]{4,30}$/;
  const checkNickname = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$/;
  const checkEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const userSchema = Joi.object({
    userId: Joi.string().pattern(checkuserId).required(),
    nickname: Joi.string().pattern(checkNickname).required(),
    email: Joi.string().pattern(checkEmail).required(),
    password: Joi.string().pattern(checkPassword).required(),
  });

  try {
    const resultSchema = userSchema.validate(req, res);
    if (resultSchema.error) {
      if (resultSchema.error.message.includes("userId")) {
        error.status = 412;
        error.message = { errorMessage: "아이디 양식을 확인해주세요" };
        throw error;
      }
      if (resultSchema.error.message.includes("nickname")) {
        error.status = 412;
        error.message = { errorMessage: "닉네임 양식을 확인해주세요" };
        throw error;
      }
      if (resultSchema.error.message.includes("email")) {
        error.status = 412;
        error.message = { errorMessage: "이메일 양식을 확인해주세요" };
        throw error;
      }
      if (resultSchema.error.message.includes("password")) {
        error.status = 412;
        error.message = { errorMessage: "비밀번호 양식을 확인해주세요" };
        throw error;
      }
    }
    return resultSchema;
  } catch (error) {
    console.log(error);
    if (error.status !== 412) {
      error.status = 400;
      error.message = { errorMessage: "예기치못한 오류가 발생하였습니다." };
      return error;
    }
    return error;
  }
};

exports.loginForm = (req, res) => {
  const checkuserId = /^[a-zA-Z0-9]{3,10}$/;
  const checkPassword = /^[a-zA-Z0-9]{4,30}$/;
  const userSchema = Joi.object({
    userId: Joi.string().pattern(checkuserId).required(),
    password: Joi.string().pattern(checkPassword).required(),
  });
  try {
    const resultSchema = userSchema.validate(req);
    if (resultSchema.error) {
      if (resultSchema.error.message.includes("userId")) {
        error.status = 412;
        error.message = {
          errorMessage: "아이디 또는 비밀번호 양식을 확인해주세요",
        };
        throw error;
      }
      if (resultSchema.error.message.includes("password")) {
        error.status = 412;
        error.message = {
          errorMessage: "아이디 또는 비밀번호 양식을 확인해주세요",
        };
        throw error;
      }
    }
    return resultSchema;
  } catch (error) {
    if (error.status !== 412) {
      error.status = 400;
      error.message = { errorMessage: "예기치못한 오류가 발생하였습니다." };
      return error;
    }
    return error;
  }
};

exports.resetForm = (req, res) => {
  // reset은 ID, 이메일, 비밀번호만 확인
  const checkuserId = /^[a-zA-Z0-9]{3,10}$/;
  const checkEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const checkPassword = /^[a-zA-Z0-9]{4,30}$/;
  // const checkNickname = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]*$/;

  const userSchema = Joi.object({
    userId: Joi.string().pattern(checkuserId).required(),
    email: Joi.string().pattern(checkEmail).required(),
    password: Joi.string().pattern(checkPassword).required(),
    // nickname: Joi.string().pattern(checkNickname).required(),
  });

  try {
    const resultSchema = userSchema.validate(req, res);
    if (resultSchema.error) {
      if (resultSchema.error.message.includes("userId")) {
        error.status = 412;
        error.message = { errorMessage: "아이디 양식을 확인해주세요" };
        throw error;
      }
      // if (resultSchema.error.message.includes("nickname")) {
      //   error.status = 412;
      //   error.message = { errorMessage: "닉네임 양식을 확인해주세요" };
      //   throw error;
      // }
      if (resultSchema.error.message.includes("email")) {
        error.status = 412;
        error.message = { errorMessage: "이메일 양식을 확인해주세요" };
        throw error;
      }
      if (resultSchema.error.message.includes("password")) {
        error.status = 412;
        error.message = { errorMessage: "비밀번호 양식을 확인해주세요" };
        throw error;
      }
    }
    return resultSchema;
  } catch (error) {
    console.log(error);
    if (error.status !== 412) {
      error.status = 400;
      error.message = { errorMessage: "예기치못한 오류가 발생하였습니다." };
      return error;
    }
    return error;
  }
};

exports.postForm = (req, res) => {
  const RE_TITLE = /^[a-zA-Z0-9\s\S]{1,20}$/;
  const RE_HTML_ERROR = /<[\s\S]*?>/;
  const RE_CONTENT = /^[\s\S]{1,50}$/;
  const postSchema = Joi.object({
    title: Joi.string()
      .pattern(RE_TITLE || RE_HTML_ERROR)
      .required(),
    content: Joi.string().pattern(RE_CONTENT).required(),
  });
  const resultSchema = postSchema.validate(req);
  try {
    if (resultSchema.error) {
      if (resultSchema.error.message.includes("title")) {
        error.status = 412;
        error.data = { errorMessage: "게시글 제목 형식을 확인해주세요." };
        throw error;
      }
      if (resultSchema.error.message.includes("content")) {
        error.status = 412;
        error.data = { errorMessage: "게시글 내용 형식을 확인해주세요." };
        throw error;
      }
    }
    return resultSchema;
  } catch (error) {
    if (error.status !== 412) {
      error.status = 400;
      error.data = { errorMessage: "예기치못한 오류가 발생하였습니다." };
      return error;
    }
    return error;
  }
};

exports.commentForm = (req, res) => {
  const RE_COMMENT = /^[\s\S]{1,100}$/;
  const commentSchema = Joi.object({
    comment: Joi.string().pattern(RE_COMMENT).required(),
  });
  const resultSchema = commentSchema.validate(req);
  try {
    if (resultSchema.error) {
      error.status = 412;
      error.data = { errorMessage: "코멘트 내용 형식을 확인해주세요." };
      throw error;
    }
    return resultSchema;
  } catch (error) {
    if (error.status !== 412) {
      error.status = 400;
      error.data = { errorMessage: "예기치못한 오류가 발생하였습니다." };
      return error;
    }
    return error;
  }
};
