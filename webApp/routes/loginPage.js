const express = require('express')
const router = express.Router()

router.get('/users',(req, res)=>{
    res.send('User List')
})

router.get('/userlist',(req, res)=>{
    res.send('User New Form')
})

router.get('/signup',(req, res)=>{
    res.send('SIGNUP FORM')
})

router.get('/account',(req, res)=>{
    res.send('[USER LOGGED IN] DISPLAYING ACCOUNT INFORMATION')
})

module.exports = router