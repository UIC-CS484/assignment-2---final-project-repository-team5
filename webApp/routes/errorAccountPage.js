const express = require('express')
const router = express.Router()


router.get('/',(req, res)=>{
    res.send('Error occurred. Please head to the Login page.')
})

module.exports = router