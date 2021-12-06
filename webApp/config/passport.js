const LocalStrategy = require('passport-local').Strategy;
// let dataStore = require('../database/task.sqlite')
const databaseFunction = require("../database_function");

module.exports = function (passport){
    console.log("Passport Function triggered");

    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    }, function(username, password, done) {
        console.log(username + ", " + password);
        // console.log("here");
        //todo: search user.json file to see if user exists.

        'use strict';


        // let users = dataStore;
        // console.log(JSON.stringify(users));

        databaseFunction.authenticateUser(username, password, done)

        // for (let i=0; i<users.length; i++){
        //     const user = users[i];
        //     if(user.username == username && user.password == password){
        //         done(null, user);
        //     }else{
        //         console.log("user not found.")
        //         done(null, false);
        //
        //     }
        // }

    }));

    passport.serializeUser(function (user, done){
        done(null, user);

    });

    passport.deserializeUser(function (user, done){
        done(null, user);

    });

}