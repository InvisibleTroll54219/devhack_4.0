const Markattendance = require("../models/markAttendanceModel");
exports.addAttendance = async (req,res) =>{
    console.log("hi");
    console.log(req.body);
    console.log("hi");
    try{
        const newClass = await Markattendance.create(req.body);
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