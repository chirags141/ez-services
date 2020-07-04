const express = require('express')
const router = express.Router()
const User = require('../models/User')


// user Login Route
//      /user/login

router.post("/login",(req,res)=>{
 
    console.log(req.body);
    res.send("Loginng in")
})

// user register Route
//      /user/register

router.post("/register",async(req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        res.send("Registering User")
    } catch (err) {
        res.status(400).send(err)
    }
    
})

module.exports = router