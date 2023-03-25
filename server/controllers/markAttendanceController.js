const Markattendance = require("../models/markAttendanceModel");
const sgMail = require("@sendgrid/mail")
const API_KEY = "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";
sgMail.setApiKey(API_KEY);
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

exports.deleteStudents = async (req,res) =>{
        // console.log("hi");
        const course_id  = req.query.id;
        console.log(course_id);
        // console.log("hi");
        if(stu.length==0){
            res.status(400).json({
                status: "fail",
                message: err
            })
        }
        try{
            const newClass = await Markattendance.deleteMany({course_id: course_id});
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


exports.sendEmail = async (req,res) =>{
    const id = req.query.id;
    const email = req.query.email;
    const c_name = req.query.cname;
    try{
        const newClass = await Markattendance.find({course_id: id});
        console.log(newClass+"this is error");
        let s = "";
        for (let i = 0; i < newClass.length; i++){
            s=s+"<li>"+newClass[i].email+"</li>";
        } 
        console.log(s);
        const str = new Date().toDateString() + " present students for "+ c_name ;
        console.log(str);
        const message = {
            to: email,
            from: "mandardeshpande2003@gmail.com",
            subject: str,
            text: s,
            html: "<ul>"+s+"</ul>"
        }
        sgMail.send(message);
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