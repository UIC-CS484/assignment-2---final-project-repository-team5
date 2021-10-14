const express = require('express')
const router = express.Router()


router.get('/',(req, res)=>{
    res.send('CREATE ACCOUNT ')
})

module.exports = router