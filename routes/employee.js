const express = require('express')
const router = express.Router()


// employee Login Route
//      /employee/login

router.post("/login",(req,res)=>{
    console.log(req.body)
    res.send("Loginng in")
})

// employee register Route
//      /employee/register

router.post("/register",(req,res)=>{
    console.log(req.body)
    res.send("Registering")
})

module.exports = router

