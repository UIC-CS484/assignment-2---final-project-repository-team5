const express = require('express')
const app = express()
const port = 3000
const createError = require('http-errors');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const sqlite3 = require('sqlite3').verbose() //npm install sqlite3

app.set('views', './views');
app.set('view engine', 'hbs');

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// Creating routers
const loginRouter = require('./routes/loginPage')
const createAccountRouter = require('./routes/createAccountPage')
const updateAccountRouter = require('./routes/updateAccountPage')
const deleteAccountRouter = require('./routes/deleteAccountPage')
const errorAccountRouter = require('./routes/errorAccountPage')
const afterLoggingInRouter = require('./routes/loginFormSubmit')

// Linking routes to routers.
app.use('/login',loginRouter)
app.use('/createAccount',createAccountRouter)
app.use('/updateAccount',updateAccountRouter)
app.use('/deleteAccount',deleteAccountRouter)
app.use('/error',errorAccountRouter)
app.use('/afterLoggingIn', afterLoggingInRouter)

// Render home.hbs view
app.get('/',(req, res) => {
    res.render('home');
    console.log("/ called")
})

// Render login.hbs view
app.get('/login',(req, res) => {
    res.render('login');
    console.log("/login called")
})

// Render createAccount.hbs view
app.get('/createAccount', (req,res) => {
    //res.render('createAccount')
    console.log("/createAccount called")
})

// Render updateAccount.hbs view
app.get('/updateAccount', (req,res) => {
    res.render('updateAccount')
    console.log("/updateAccount called")
})

// Render deleteAccount.hbs view
app.get('/deleteAccount', (req,res) => {
    res.render('deleteAccount')
    console.log("/deleteAccount called")
})

// Login Form Submitted
app.get('/afterLoggingIn',(req, res)=>{
    //console.log("here");
    //res.render('afterLoggingIn')
    console.log(req.query.username, req.query.password)
    //authenticate, re-route on success and failure
})

// Run server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

