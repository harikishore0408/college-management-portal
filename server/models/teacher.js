const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cousre'
    },
    entity:{
        type:String,
        default:'teacher'
    }
    
},{
    timestamps:true
});

const Teacher = mongoose.model('Teacher',teacherSchema);
module.exports = Teacher;
