var mongoose=require('mongoose');

const courseSchema=mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 100
    },
    email:{
        type: String,
        required: true
    },
    students:{
        type: [String],
        default: []
    }
});

module.exports=mongoose.model('Course',courseSchema);