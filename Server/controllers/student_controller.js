const Student = require('../models/student');
const Teacher = require('../models/teacher');

const Assignment = require('../models/assignment');
const Cousre = require('../models/course');
const { populate } = require('../models/student');


module.exports.login = function(req,res){

            
            return res.json({
                 status:true,
                 message:'Signed in succesfully',
                //  name:res.locals.user.name
             })
  
    
}

module.exports.loginError = function(req,res){
    console.log(req.body);
    
    Student.findOne({email:req.body.email},function(err,student){
        if(student){
            if(student.password != req.body.password){
                res.json({
                    status:false,
                    message:'Wrong password'
                })
            }

            res.json({
                status:true,
                message:'Student is in database'
            })
        }else{
            res.json({
                status:false,
                message:'Student not in data'
            })
        }
    });
}

module.exports.getAssignment = function(req,res){

    Assignment.find({
        subject:req.params.subject
    },function(err,assignments){
        if(err){res.send('error in finding the assignmnet')}
        res.json(assignments);
    })
}

module.exports.submitAssignment = async function(req,res){

    console.log(req.query.id,'***id')
    console.log(req.query.student, '***std')
    console.log(req.document)
    console.log(req.assignment_id)
    console.log(res.locals.user.id,'--',res.locals.user.name)
    
    try{

        let student = await Student.findById(res.locals.user.id)
        Student.uploadedDocument(req,res,function(err){

            Assignment.findByIdAndUpdate(req.query.id,{
                $push:{students:res.locals.user.id}
                },function(err,assignment){
                    console.log(res.locals.user.id,'---inside assign--');

                    console.log(assignment,'---atudent added for submitted assign')
            })

            if(err){
                console.log('error in document upload');
                return res.json({
                    status:false,
                    message:"error in uploading assignment"
                })
            }
            
            let path
            if(req.file){
                path = Student.documentPath +'/'+req.file.filename;
            }
            student.log.push(
                {
                   assignment: req.query.id,
                   document:path,
                   grade:-1
                }
            )

            

            console.log(student);
            student.save();
        })

        return res.json({
            status:true,
            message:'Assignment Submitted'
        })


        // Student.findById(res.locals.user.id).populate({
        //     path:'log',
        //     populate:{
        //         path:'assignment'
        //     }
        // }).exec(function(err,student){
        //     if(err){ console.log('erererer')}
        //     console.log(student.log);
        // })

    }catch(err){
        console.log(err);
        return res.json({
            status:false,
            message:'Assignment Submitted'
        })
    }


    
    
}

module.exports.assignmentsDetail

module.exports.getUser = function(req,res){
    
    res.json({
        status:true,
        message:'Signed in succesfully',
        user:res.locals.user
    })
}

module.exports.getCourses = function(req,res){
    Cousre.find({},function(err,courses){
        if(err){return res.send('no course available');}
        res.json(courses);

    })
}

module.exports.create = function(req,res) {
        console.log(req.body,'*******');
        


    if(req.body.password != req.body.confirmed_password){
        console.log("password mismatch");
        // res.send("password do not match");
        res.json({
            status:false,
            message:'Password do not match'
        })
        return;
    }
    console.log('req.body');

    console.log(req.body);

    Student.findOne({email:req.body.email},function(err,student){
  

        console.log(student)
        if(!student){
            Student.create(req.body,function(err,student){
                if(err){res.send('error in creating the Student');}
                console.log(student);
                // res.send('Student Created');
                res.json({
                    status:true,
                    message:'Student Created'
                })
            })
        }else{ 
            // res.send('Student already present of this email')
            res.json({
                status:false,
                message:'Student already present'
            })
        }
    });

    
   


}