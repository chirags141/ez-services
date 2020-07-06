const express = require('express')
const router = express.Router()
const User = require('../models/User')


// user Login Route
//      /user/login

router.post("/login",async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send("Logged in as user")    
    } catch (err) {
        res.status(400).send(err)
    }
})

// user register Route
//      /user/register

router.post("/register",async(req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send("Registering User")
    } catch (err) {
        res.status(400).send(err)
    }
    
})

module.exports = router