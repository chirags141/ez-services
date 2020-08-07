const express = require('express')
const router = express.Router()
const userAuth = require("../middleware/userAuth")
const User = require('../models/User')


// user Login Route
// POST     /user/login

router.post("/login",async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
    
        res.cookie('token', token, {
            secure: false,
            httpOnly: true,
          });

          if(user){
              res.redirect("/user/me")
          }else{
              res.redirect("/")
          }
    } catch (err) {
        res.status(400).send(err)
    }
})

// user register Route
// POST /user/register

router.post("/register",async(req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.cookie('token', token, {
            secure: false,
            httpOnly: true,
          });

          if(user){
            res.redirect("/user/me")
        }else{
            res.redirect("/")
        }
    } catch (err) {
        res.status(400).send(err)
    }
    
})

// user profile Route
//  GET    /user/me

router.get("/me",userAuth, async(req,res)=>{
   const user = req.user
    res.render("user/userDashboard",{user})
})


// user Logout Route
//  GET    /user/logout
router.get('/logout',userAuth,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.redirect("/")
    } catch (err) {
        res.status(500).send()
    }
})

// user Logout All Route
//  GET    /user/logoutAll
router.get('/logoutAll',userAuth, async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.redirect("/")
    } catch (err) {
        res.status(500).send()
    }
})


router.get('/bookService',userAuth,async(req,res)=>{
    const user = req.user
    res.render("user/bookService",{user})
})

module.exports = router