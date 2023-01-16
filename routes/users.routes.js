const express = require('express');
const router = express.Router();
/**
 * 로그인 / 회원가입 / 비밀번호 재설정 기능 통합 관리
 */
const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();
/**
 * 로그인 기능
 */
router.post('/login', usersController.loginProcess);
/**
 * 회원가입
 */
router.post('/signup', usersController.signupProcess);
/**
 * 비밀번호 재설정
 */
router.patch('/reset', usersController.resetProcess);

module.exports = router;
