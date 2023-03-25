const express = require('express');
const courseController = require('./../controllers/courseController');
const router = express.Router();

router
.route('/')
.post(courseController.createCourse)
.get(courseController.getCourses)
.patch(courseController.updateCourse)
module.exports = router;