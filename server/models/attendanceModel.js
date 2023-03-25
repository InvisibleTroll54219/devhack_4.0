var mongoose=require('mongoose');

const attendanceSchema=mongoose.Schema({
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    course_id:{
        type: String,
        required:true
    },
    class_duration:{
        type: Number,
        required: true
    },
    prof_email:{
        type: String,
        required:true
    }
});

module.exports=mongoose.model('Attendance',attendanceSchema);