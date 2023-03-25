const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');
const attendanceRouter = require('./routes/attendanceRouter');
const markAttendanceRouter = require("./routes/markAttendanceRouter");
const session = require('express-session');
const cors = require('cors');
const app=express();
mongoose.set('strictQuery', false);
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cors());
app.use(session({
    secret: "sarthandmandar",
    cookie:{
        sameSite: 'strict',
    },
    resave: true,
    saveUninitialized: false
}));
//in connection method we need to pass in db connection string
const DB = "mongodb+srv://Mandar:0hdg4Atb5HHtFGw7@cluster0.3y8v494.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB).then(() =>{
    console.log("Database connection successful");
});

app.use('/api/v1/users',userRouter);
app.use('/api/v1/courses',courseRouter);
app.use('/api/v1/attendance',attendanceRouter);
app.use('/api/v1/markAttendance',markAttendanceRouter);
// listening port
const PORT=process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});