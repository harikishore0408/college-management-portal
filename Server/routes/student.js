const express = require('express')
const router = express.Router();
const passport = require('passport');

console.log('router loaded');

const studentController = require('../controllers/student_controller');

// router.post('/create',(req,res)=>{
//     console.log(req.body);12
//     res.json({status:'ok'});
// });

router.post('/create',studentController.create);

router.get('/get-courses',studentController.getCourses)


router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/student/sign-in-error'
}),studentController.login);
router.get('/get-user',passport.checkAuthentication,studentController.getUser);
router.get('/sign-in-error',studentController.loginError);

router.get('/assignments/:subject',passport.checkAuthentication,studentController.getAssignment)
router.post('/submit-assignment/',passport.checkAuthentication,studentController.submitAssignment);



module.exports = router;