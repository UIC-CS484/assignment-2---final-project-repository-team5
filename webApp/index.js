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

// Linking routes to routers. Default route is login.
app.use('/',loginRouter)
app.use('/createAccount',createAccountRouter)
app.use('/updateAccount',updateAccountRouter)
app.use('/deleteAccount',deleteAccountRouter)

// Render index.hbs view
app.get('/',(req, res) => {
    res.render('index');
})

/*app.get('/createAccount', (req,res) => {
    console.log("HERE")
})*/

// Run server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})