const express = require('express')
const {route, process_params} = require("express/lib/router");
const router = express.Router()

router.get('/loginFormSubmit',(req, res)=>{
    console.log(req.query.username, req.query.password)
})

module.exports = router