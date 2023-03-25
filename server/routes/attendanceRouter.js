const express = require('express');
const attendanceController = require('./../controllers/attendanceController');
const router = express.Router();

router
.route('/')
.post(attendanceController.createClass)
.delete(attendanceController.deleteClass)
.get(attendanceController.getClass)
module.exports = router;