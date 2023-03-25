var mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 100
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    profession:{
        required: true,
        type:String
    },
    token:{
        type: String
    },
    courses:[[String]]
});

module.exports=mongoose.model('User',userSchema);