const express = require('express')

const port = 3000
const createError = require('http-errors');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const sqlite3 = require('sqlite3').verbose() //npm install sqlite3
const passport = require('passport');
// var path = require('path');
const cookieParser = require('cookie-parser');

// Creating routers
const loginRouter = require('./routes/loginPage')
const createAccountRouter = require('./routes/createAccountPage')
const updateAccountRouter = require('./routes/updateAccountPage')
const deleteAccountRouter = require('./routes/deleteAccountPage')
const errorAccountRouter = require('./routes/errorAccountPage')
const loginSubmitRouter = require('./routes/loginFormSubmit')
const dashboardRouter = require('./routes/dashboard')
const submitRouter = require('./routes/submit');
const axios = require("axios");
const {log} = require("nodemon/lib/utils");

const app = express()

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

//passport config
require('./config/passport')(passport);

var session_config = {
    secret: 'secret', //a random unique string key used to authenticate a session
    resave: true, //enables the session to be stored back to the session store, even if the session was never modified during the request
    saveUninitialized: true, //his allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.
    cookie: { secure: true } //true is a recommended option. However, it requires an https-enabled website
    //store  parameter when saving session to database
};

session_config.cookie.secure = false;
//IMPORTANT REVIEW IN CLASS - https://expressjs.com/en/resources/middleware/session.html

//Express Sessions
app.use(session(session_config))
//Reference for above - https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Linking routes to routers.
app.use('/login',loginRouter)
app.use('/createAccount',createAccountRouter)
app.use('/updateAccount',updateAccountRouter)
app.use('/deleteAccount',deleteAccountRouter)
app.use('/error',errorAccountRouter)
app.use('/loginSubmit', loginSubmitRouter)
app.use('/dashboard',dashboardRouter)
app.use('/submit',submitRouter)


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

app.get('/results',(req, res)=>{
    console.log('INDEX-> /dashboard LOG')
    console.log('__________________________________')
    console.log(req.query.userTerm)
    //TODO authenticate, re-route on success and failure
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: {term: req.query.userTerm, locale: 'en-US', offset: '0', limit: '5'},
        headers: {
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': '7ae14268e5msh241a0d6655ae5fdp1aaa57jsnefdf711c7928'
        }
    };

    axios.request(options).then(function (response) {
        console.log(JSON.stringify(response.data));
        res.render('results', {data:response.data})
    }).catch(function (error) {
        console.error(error);
    });

})

app.get('/dashboard',(req, res)=>{
    res.render('dashboard')
})

// Run server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

