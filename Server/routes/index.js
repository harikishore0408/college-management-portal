const express = require('express');
const router = express.Router();
const passport = require('passport')

console.log('router loaded');

router.use('/student',require('./student'));
router.use('/teacher',require('./teacher'));
router.get('/user/logout',function(req, res){
    req.logout();
    res.send('user logged out');
})
router.get('/user/get-user',function(req, res){
    console.log('when user is called--',res.locals.user)
    if(res.locals.user){
        res.json({
            status:true,
            message:'User Signed In',
            profile:res.locals.user.entity,
            name:res.locals.user.name
            
        })
    }else{
        res.json({
            status:false,
            message:'User not signed',
            
        })
    }
})



module.exports = router;