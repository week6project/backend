const express = require("express");
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/user/login', usersController.loginProcess);
router.post('/user/signup', usersController.signupProcess);

module.exports = router;
