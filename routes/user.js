const express = require('express')
const router = express.Router()
const userAuth = require("../middleware/userAuth")
const User = require('../models/User')


// user Login Route
//      /user/login

router.post("/login",async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        res.cookie('token', token, {
            secure: false,
            httpOnly: true,
          });

        // res.header('Authorization', 'Bearer ' + token)
        res.send("Logged in as User")    
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

        // res.header('Authorization', 'Bearer ' + token)
        // res.cookie('jwt',token,{ httpOnly: true, secure:false, maxAge: 3600000 })
        res.send("Registered as user") 
    } catch (err) {
        res.status(400).send(err)
    }
    
})

router.get("/me",userAuth, async(req,res)=>{
   const user = req.user
    res.send(user)
})

module.exports = router