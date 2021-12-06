const express = require('express')
// const {route, process_params} = require("express/lib/router");
const router = express.Router()
const passport = require('passport')

router.post('/', (req, res, next) => {
    console.log("/loginSubmit called w/ POST")
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    })(req, res, next);

});

module.exports = router