const session = require('express-session');
const Course = require('./../models/courseModel');
exports.createCourse = async (req,res) =>{
    try{
        const newCourse = await Course.create(req.body);
        res.status(200).json({
            status: "success",
            body: newCourse
        });
    }
    catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

exports.getCourses = async (req,res) =>{
    try{
        console.log(req.query);
        const prof_email = req.query.em;
        const courses = await Course.find({ email: prof_email}).exec();
        console.log(courses);
        res.status(200).json({
            status: 'success',
            body: courses
        });
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message:{
                err
            }
        });
    }
}

exports.updateCourse = async (req,res) =>{
    try{
        const student_email = req.query.em;
        const course_id = req.query.course_id;
        console.log(req.body+"ih");
        const course = await Course.findOneAndUpdate(
            {_id: course_id},
            {$addToSet:{
                students: student_email, 
            },
            }
        );
        res.status(200).json({
            status: 'success',
            body: course
        });
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message:{
                err
            }
        });
    }
}