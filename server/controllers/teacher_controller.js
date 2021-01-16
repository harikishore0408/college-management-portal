const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Course = require('../models/course');
const Assignment = require('../models/assignment');

const fs = require('fs');

module.exports.login = function(req,res){
        
            res.json({
                status:true,
                message:'Signed in succesfully',
            })
    
}


module.exports.loginError = function(req,res){
    console.log(req.body);
    
    Teacher.findOne({email:req.body.email},function(err,teacher){
        if(teacher){
            if(teacher.password != req.body.password){
                res.json({
                    status:false,
                    message:'Wrong password'
                })
            }

            res.json({
                status:true,
                message:'teacher is in database'
            })
        }else{
            res.json({
                status:false,
                message:'teacher not in data'
            })
        }
    });
}


module.exports.getUser = function(req,res){
  
    res.json({
        status:true,
        message:'Signed in succesfully',
        name:res.locals.user.name
    })
}


module.exports.create = function(req,res) {
    console.log(req.body,'-------',req.body.course);
        

    //if password and confirm password do not match
    if(req.body.password != req.body.confirmed_password){
        console.log("password mismatch");
        res.json({
            status:false,
            message:'Password do not match'
        })
        return;
    }


   
    
    Teacher.findOne({email:req.body.email},async function(err,teacher){
        console.log(teacher);
        //creating only if teacher is not present
        if(!teacher){

            //findind the course to be teached
            Course.findOne({subject:req.body.subject}, function(err,course){
                console.log('course found--',course);
                if(err){console.log('error in finding the course');}
                
                if(!course){ //if course id not in db, then creating entry
                console.log('course not fount');

                    Course.create({subject:req.body.subject},function(err,course){
                        console.log('creating course')
                        if(err){
                            console.log('error in creating course');
                            res.send('error in adding course');
                        }
                        console.log('course created',course)
                        Teacher.create({ //creating teacher entry with newly added course in db
                            email:req.body.email,
                            password:req.body.password,
                            name:req.body.name,
                            course:course._id,
                        },function(err,teacher){
                            console.log('creating teacher after creating course')
                            if(err){res.send('error in creating the error')}
                            console.log(teacher);
                            res.json({
                                status:true,
                                name:teacher.name
                            })
                        });
                    });
                }

                //creating teacher entry with already added course in db
            else Teacher.create({

                    email:req.body.email,
                    password:req.body.password,
                    name:req.body.name,
                    course:course._id,
                },function(err,teacher){
                    console.log('creating teacher as course is there')
                    console.log(teacher);

                    if(err){res.send('error in creating the error')}
                    res.json({
                        status:true,
                        name:teacher.name
                    })
                });
            });

        }else{ 
            res.json({
                status:false,
                message:'Teacher already present'
            })
        }
    });

    
}

module.exports.getCourse = function(req,res){
    Course.findById(res.locals.user.course,function(err,course){
        if(err){return res.send('no course found')}
        res.json(course);
    });
    
   
}

module.exports.addTopic = function(req,res){
    Course.findByIdAndUpdate(res.locals.user.course,{$push:{topics:req.params.topic}},function(err,course){
        if(err){return res.send('error in adding topics');}
        console.log('adding topic',course);
        res.json(course);

    });
}

module.exports.addAssignment = function(req,res){

    req.body.subject = res.locals.user.course.subject;
    console.log('---req.body add assignment--',req.body)
    Assignment.create(req.body,function(err,doc){

        if(err){return res.send('error in adding assignment')}
        console.log(doc);
        res.json({
            status:true,
            message:'Assignment added'
        })


    })
    
}

module.exports.getDocument = function (req,res){
    console.log('geting file----_***********')
    console.log(req.query.path,'--path');
    // var file = fs.createReadStream('./uploads/student/documents/document-1609679883690');
    var file = fs.createReadStream('.'+req.query.path);

    file.pipe(res);
}

module.exports.giveGrades = function(req,res){
    console.log('-------giveGrades function is executing--------')
    console.log(req.query.id);
    console.log(req.query.grade);
    console.log(req.body.student);

    Student.findOneAndUpdate({'log._id':req.query.id},{'$set':{
            'log.$.grade': req.query.grade
        }},function(err,student){
            
            if(err){return res.send('error in grading')}
            res.json({
                status:true,
                message:'Evaluated'
             } )


            
    })



}

module.exports.assignmentList = function(req,res){

    Assignment.find({ 
        subject:res.locals.user.course.subject  //all the similar subject assignment of same teacher
        },function(err,assignments){
            if(err){return res.send('Error in finding the assignment list')}
            // console.log('----assignments----',assignments)
            res.json(assignments)
    })
}



module.exports.getStudents = function(req,res){
    
    Student.find({
        courses: { $in: [res.locals.user.course.subject] }
    },function(err,students){
        if(err){
            res.send('error in finding student')
        }

        // console.log('-------',students,'--GETTING--')
        res.json(students)
    });
    

    
}