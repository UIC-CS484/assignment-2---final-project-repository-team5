const express = require('express')
const router = express.Router()


router.get('/',(req, res)=>{
    res.send('DELETE ACCOUNT')
})

module.exports = router