const LocalStrategy = require('passport-local').Strategy;
const passport = require("passport");


module.exports = function (passport){
    console.log("Passport Function triggered");

    passport.use(new LocalStrategy({usernameField: "Username", passwordField: "userPassword"}, function(Username, userPassword, done) {
        //console.log(Username + " " + userPassword);
        console.log("here");
    }));

    passport.serializeUser(function (user, done){
        done(null, user);

    });

    passport.deserializeUser(function (user, done){
        done(null, user);

    });

}