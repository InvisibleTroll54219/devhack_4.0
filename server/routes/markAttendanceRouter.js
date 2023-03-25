const express = require('express');
const markAttendanceController = require('./../controllers/markAttendanceController');
const router = express.Router();

router
.route('/')
.post(markAttendanceController.addAttendance)
.get(markAttendanceController.sendEmail)
.delete(markAttendanceController.deleteStudents)
module.exports = router;