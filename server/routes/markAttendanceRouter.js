const express = require('express');
const markAttendanceController = require('./../controllers/markAttendanceController');
const router = express.Router();

router
.route('/')
.post(markAttendanceController.addAttendance)
module.exports = router;