const Student = require('../models/student');
const Assignment = require('../models/assignment');
const Cousre = require('../models/course');


module.exports.login = function(req,res){

            res.json({
                status:true,
                message:'Signed in succesfully',
                name:res.locals.user.name
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
    Assignment.find({subject:req.params.subject},function(err,assignments){
        if(err){res.send('error in finding the assignmnet')}
        console.log(assignments,'*********');
        res.json(assignments);
    })
}

module.exports.submitAssignment = function(req,res){

console.log(req.query.id,'***id')
console.log(req.query.student, '***std')

    Assignment.findByIdAndUpdate(req.query.id,{ '$push':{student:req.query.student}},function(err,assigment){
        console.log('submit assigment controller')
        if(err){console.log(err)}
        console.log(assigment)

    })


    // Assignment.findById(req.query.id,function(err,assigment){
    //     console.log('submit assigment controller')
    //     if(err){console.log(err)}
    //     console.log(assigment)

    // })
    
}

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


    Student.findOne({email:req.body.email},function(err,student){
    // if(err){res.send("error in creating the user");}
    //    const { name,email,  password,  confirmed_password} = req.body;
    //    console.log('line one')
    //     if (err) {
    //         console.log('User.js post error: ', err)
    //     } else if (student) {
    //         console.log('line two')
    //         res.json({
    //             error: `Sorry, already a user with the username: ${name}`
    //         })
    //     }
    //     else {
    //         console.log('line three')
    //         const newStudent = new Student({
    //             name: name,
    //             email: email,
    //             password: password,
    //         })
    //         newStudent.save((err, savedStudent) => {
    //             if (err)  {
    //                 console.log('line four')
    //                 res.json(err)
    //             }
    //             res.json(savedStudent)
    //         })
    //     }

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