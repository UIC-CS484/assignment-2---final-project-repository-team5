var express = require('express');
var router = express.Router();
var fs = require('fs');
const databaseFunction = require("../database_function");


/* GET home page. */
router.post('/', function(req, res, next) {

    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var username = req.body.username;
    var password = req.body.password;

    if (password.length < 2){
        var error = "Password not long enough";
        res.render('error', {error:error});
    }
    else{
        console.log("first_name: " + first_name + "last_name: " + last_name + " username: " + username + " password: " + password);

        'use strict';
        var randomValue = Math.floor(Math.random() * 123);
        let users = [{
            id: randomValue,
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password
        }];

        databaseFunction.createUser(users[0].id, users[0].first_name, users[0].last_name, users[0].username, users[0].password);


        let data = JSON.stringify(users);
        fs.writeFileSync('users.json', data);

        res.render('confirmation', { first_name : first_name, last_name: last_name});
        //todo: redirect to dashboard
    }
});

module.exports = router;