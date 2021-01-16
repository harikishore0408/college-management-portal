const express = require('express')
const router = express.Router();
const passport = require('passport');

console.log('router loaded');

const teacherController = require('../controllers/teacher_controller');

router.post('/create',teacherController.create);

router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/teacher/sign-in-error'
}),teacherController.login);

router.get('/get-user',passport.checkAuthentication,teacherController.getUser)

router.get('/sign-in-error',teacherController.loginError);

router.post('/add-assignment',passport.checkAuthentication,teacherController.addAssignment);

router.get('/assignment-list',passport.checkAuthentication,teacherController.assignmentList);

router.get('/get-students',passport.checkAuthentication,teacherController.getStudents);

router.get('/get-course',passport.checkAuthentication,teacherController.getCourse);

router.post('/add-topic/:topic',passport.checkAuthentication,teacherController.addTopic);

router.get('/get-file',passport.checkAuthentication,teacherController.getDocument);

router.post('/give-grades',passport.checkAuthentication,teacherController.giveGrades);











module.exports = router;