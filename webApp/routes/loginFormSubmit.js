const express = require('express')
const {route, process_params} = require("express/lib/router");
const fs = require('fs');
const router = express.Router()

router.get('/afterLoggingIn',(req, res)=>{
    console.log("Here 2",req.query.username, req.query.password)
})

module.exports = router