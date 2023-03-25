const User = require('./../models/userModel');
exports.getCourses = async (req,res) =>{
    console.log(req.params);
    const email = req.params['email'];
    let user = await User.find({
        email: email
    }).exec();
    try{
        res.status(200).json({
            body: user[0]
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
exports.createUser = async (req,res) =>{
    try{
    const newUser = await User.create(req.body);
    res.status(200).json({
        status: "success",
        body: newUser
    });
    }
    catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

exports.login = async (req,res) =>{
    try{
        console.log(req.body);
        const {email, password} = req.body;
        let user = await User.findOne({
            email: email,password:password
        }).exec();
        if(user.email){
            req.session.user = user;
            req.session.authorized = true;
            res.status(200).json({
                status: "success",
                body: user
            });
        }
        else{
            res.status(400).json({
                status: "fail",
                message: err
            })
        }
    }
    catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}
exports.updateUser = async (req,res) =>{
    try{
        console.log(req.query);
        const student_email = req.query.em;
        const course_name = req.query.course;
        const course_id = req.query.course_id;
        const newObj = [course_name,course_id];
        console.log(course_name,course_id);
        const user = await User.findOneAndUpdate(
            {email: student_email},
            {$addToSet:{
                courses:newObj
            },
            }
        );
        console.log(user);
        res.status(200).json({
            status: 'success',
            body: user
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
