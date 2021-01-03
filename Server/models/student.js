const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const DOCUMENT_PATH = path.join('/uploads/student/documents')



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
    courses:{
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
        document:{
            type:String
        },
        grade:{
            type:Number,
            default:-1
        }
    }]

    
},{
    timestamps:true
});


let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',DOCUMENT_PATH));
    },
    filename:function(req,file,cb){
        console.log(file,'---file-------')
        cb(null,file.fieldname+'-'+Date.now());
    }
})

studentSchema.statics.uploadedDocument = multer({storage:storage}).single('document');
studentSchema.statics.documentPath = DOCUMENT_PATH;

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;
