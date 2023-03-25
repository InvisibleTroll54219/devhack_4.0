const Attendance = require("../models/attendanceModel");
exports.createClass = async (req,res) =>{
    console.log("hi");
    console.log(req.body);
    console.log("hi");
    try{
        const newClass = await Attendance.create(req.body);
        res.status(200).json({
            status: "success",
            body: newClass
        });
    }
    catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}
exports.getClass = async (req,res) =>{
    console.log("hi");
    console.log(req.query.course_id);
    console.log("hi");
    try{
        const newClass = await Attendance.findOne({course_id: req.query.course_id}).exec();
        console.log("new");
        console.log(newClass);
        res.status(200).json({
            status: "success",
            body: newClass
        });
    }
    catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}
exports.deleteClass = async (req,res) =>{
    // console.log("hi");
    const course_id  = req.query.id;
    console.log(course_id);
    // console.log("hi");
    try{
        const newClass = await Attendance.deleteMany({course_id: course_id});
        res.status(200).json({
            status: "success",
            body: newClass
        });
    }
    catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}