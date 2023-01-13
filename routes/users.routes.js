const express = require('express');
const router = express.Router();
const UsersController = require('../controller/users.controller');
const usersController = new UsersController();

router.post('/user/login', usersController.login);
router.post('/user/signup', usersController.signup);

module.exports = router;
