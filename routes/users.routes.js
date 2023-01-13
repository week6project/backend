const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/login', usersController.loginProcess);
router.post('/signup', usersController.signupProcess);
router.patch('/reset', usersController.resetProcess);

module.exports = router;
