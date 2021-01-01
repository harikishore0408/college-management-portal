const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    subject:{
        type:Array,
    },
    entity:{
        type:String,
        default:'student'
    },
    log: [{
       assignment: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Assignment'
        },
        grade:{
            type:Number,
            default:-1
        }
    }]

    
},{
    timestamps:true
});

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;
