const express = require('express')
const router = express.Router()
// const userAuth = require('../middleware/userAuth')


router.get("/",(req,res)=>{

    res.render("index")
    
})

module.exports = router