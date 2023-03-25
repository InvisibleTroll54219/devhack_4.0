var mongoose=require('mongoose');

const markattendanceSchema=mongoose.Schema({
    email:{
        type: String,
    },
    course_id:{
        type: String
    },
    isPresent:{
        type: Boolean
    }
});

module.exports=mongoose.model('markAttendance',markattendanceSchema);