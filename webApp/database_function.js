var sqlite3 = require('sqlite3').verbose() //npm install sqlite3
// const bcrypt = require('bcryptjs');

//Creating a new database instance - Indication of connected database
//Before performing any operations to database, make sure database is connected.
let db = new sqlite3.Database('./database/task.sqlite', (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else{
        //Successful database connection
        console.log('Connected to the SQLite database.')
    }
});

//Create a User
let createUser = (id, firstName, lastName, username, password) =>{
    console.log("In createUser")


    var createUserSql = 'INSERT INTO USER(user_id, user_firstName, user_lastName, user_userName ,user_userPassword) VALUES (?,?,?,?,?)'
    var params =[id ,firstName, lastName, username, password];

    db.run(createUserSql, params, function(err){
        if (err){
            return console.log(err.message);
        }
        console.log("User Created");
        console.log(`Rows inserted ${this.changes}`);
    });
}

//Return a user from database
let authenticateUser = (username, password, done) =>{

    var findUser = 'SELECT * FROM USER WHERE user_userName = ?';

    db.get(findUser, username, function (err, user) {
        //console.log(user);
        if (!user) {
            //return done(null, false);
            console.log("in above if User not found")
        }
        console.log("Entered password is: "+ password+ " Original password is: " +user.user_userPassword)
        if(password === user.user_userPassword){
            console.log("User does exist")
            console.log(user)
            done(null, user)
        }
        else{
            console.log("User does NOT exist")
            done(null, false)
        }
        /*        bcrypt.compare(password, "password" , function (err, result) {
                    if (err) {
                        return console.log(err.message);
                    }
                    console.log(result)
                    if (result) {
                        return done(null, user);
                    }
                    else{
                        console.log("in below if - User not found")
                    }
                });*/

    });
}

module.exports = {db, createUser, authenticateUser}