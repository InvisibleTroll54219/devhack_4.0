const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router
.route('/')
.post(userController.createUser)
.patch(userController.updateUser)

router.route('/:email')
.get(userController.getCourses)

router
.route('/login')
.post(userController.login)

module.exports = router;