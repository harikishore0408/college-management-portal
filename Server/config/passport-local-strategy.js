const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/teacher');

const Teacher = require('../models/teacher');
const Student = require('../models/student');

// var User;

// authentication using passport

// passport.use(new LocalStrategy({
//         usernameField: 'email'
//     },
//     function(email, password, done){
//         // find a user and establish the identity
//         User.findOne({email: email}, function(err, user)  {
//             if (err){
//                 console.log('Error in finding user --> Passport');
//                 return done(err);
//             }

//             if (!user || user.password != password){
//                 console.log('Invalid Username/Password');
//                 return done(null, false);
//             }

//             return done(null, user);
//         });
//     }


// ));

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done){
    // find a user and establish the identity
    Student.findOne({ email : email }, function(err, user) {
        // first method succeeded?
        if (!err && user && user.password == password ){
          return done(null, user);
        }
        // no, try second method:
        Teacher.findOne({ email : email }, function(err, user) {
          // second method succeeded?
          if (! err && user && user.password == password) {
            return done(null, user);
          }
          // fail! 
          done(new Error('invalid user or password'));
        });
      }); 
  
}


));



// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    console.log('serialing ',user.entity)
    done(null, {
        id:user._id,
        type:user.entity
    });
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(user, done){

    if(user.type=='teacher'){
        Teacher.findById(user.id, function(err, user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            return done(null, user);
        });
    }
    if(user.type=='student'){
        Student.findById(user.id, function(err, user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            return done(null, user);
        });
    }

});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    console.log('User not signed in');

    // if the user is not signed in
    return res.json({
        status:false,
        message:'user not signed in'
    })
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;