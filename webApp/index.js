const express = require('express')
const app = express()
const port = 3000
const createError = require('http-errors');

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
const dashboardRouter = require('./routes/dashboard')
const axios = require("axios");
const {log} = require("nodemon/lib/utils");

// Linking routes to routers.
app.use('/login',loginRouter)
app.use('/createAccount',createAccountRouter)
app.use('/updateAccount',updateAccountRouter)
app.use('/deleteAccount',deleteAccountRouter)
app.use('/error',errorAccountRouter)
app.use('/dashboard',dashboardRouter)


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
    res.render('createAccount')
    console.log("/createAccount called")
})

// Render updateAccount.hbs view
app.get('/updateAccount', (req,res) => {
    res.render('updateAccount')
    console.log("/updateAccount called")
})

// Render deleteAccount.hbs view
app.get('deleteAccount', (req,res) => {
    res.render('deleteAccount')
    console.log("/deleteAccount called")
})

// Login Form Submitted
app.get('/loginFormSubmit',(req, res)=>{
    console.log(req.query.username, req.query.password)
    //authenticate, re-route on success and failure
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

    axios.request(options).then(async function (response) {
        // console.log(JSON.stringify(response.data));

        let responses = []
        for (let hit of response.data.tracks.hits) {
            console.log(hit.track.key)
            const options2 = {
                method: 'GET',
                url: 'https://shazam.p.rapidapi.com/songs/get-count',
                params: {key: hit.track.key},
                headers: {
                    'x-rapidapi-host': 'shazam.p.rapidapi.com',
                    'x-rapidapi-key': '7ae14268e5msh241a0d6655ae5fdp1aaa57jsnefdf711c7928'
                }
            };
            responses.push(await axios.request(options2))
        }

        totals = []
        for (let res of responses) {
            // console.log("DATA IS HEREEEE")
            // console.log(res.data);
            let obj = {
                name: response.data.tracks.hits[0].track.title,
                total: res.data.total
            }
            totals.push(obj)
        }

        console.log(totals)
        res.render('results', {data:{data1: response.data, data2: totals}})

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