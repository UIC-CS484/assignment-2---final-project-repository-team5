const express = require('express')
const app = express()
const port = 3000
const createError = require('http-errors');

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/',(req, res) => {
    res.render('index');
})

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

const loginRouter = require('./routes/loginPage')
const createAccountRouter = require('./routes/createAccountPage')
const updateAccountRouter = require('./routes/updateAccountPage')
const deleteAccountRouter = require('./routes/deleteAccountPage')

app.use('/',loginRouter)
app.use('/createaccount',createAccountRouter)
app.use('/updateaccount',updateAccountRouter)
app.use('/deleteaccount',deleteAccountRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})