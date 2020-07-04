const express = require('express')
const router = express.Router()

router.post("/login",(req,res)=>{
    console.log(req.body)
    res.send("Loginng in")
})

router.post("/register",(req,res)=>{
    console.log(req.body.name)
    res.send("Registering")
})

module.exports = router