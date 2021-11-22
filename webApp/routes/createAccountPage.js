const express = require('express')
const router = express.Router()


router.get('/',(req, res)=>{
    res.render('createAccount')
    console.log("In create Account")
    console.log("First Name is: ", req.query.FirstName)
})

module.exports = router