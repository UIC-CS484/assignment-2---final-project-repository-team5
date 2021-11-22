var sqlite3 = require('sqlite3').verbose() //npm install sqlite3

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
let createUser = (id, email, username, password) =>{
    console.log("HERE")
    var createUserSql = 'INSERT INTO USER (user_id, user_email, user_name ,user_password) VALUES (?,?,?,?)'
    var params =[null, email, username, password];

    db.run(createUserSql, params, function(err){
        if (err){
            return console.log(err.message);
        }
        console.log("User Created");
        console.log(`Rows inserted ${this.changes}`);
    });
}

createUser(1,"sgedam2", "surgeon15","sahil")
createUser(2, "aagraw26", "bighsot", "anssh")
createUser(3, "athama2", "kronicrage", "aryan")

module.exports = {createUser};
