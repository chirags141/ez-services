const express = require('express')
const router = express.Router()
const userAuth = require("../middleware/userAuth")
const User = require('../models/User')
const Service = require("../models/Service")

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
              res.redirect("/users/me")
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
            res.redirect("/users/me")
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


router.get('/service',userAuth,async(req,res)=>{
    const user = req.user
    res.render("user/service",{user})
})

router.post('/service',userAuth,async(req,res)=>{
    const service = new Service({
        name : req.body.name,
        email: req.body.email,
        mobile :req.body.mobile,
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        typeOfService : req.body.bookService,
        subServices : req.body.electrician || req.body.plumber || req.body.carpenter,
        description: req.body.description,
        user :req.user._id  
    })
    try {
        await service.save()
        await req.user.populate("services").execPopulate()
        console.log(req.user.task);
  
        // console.log(service);
        res.redirect("/users/bookings")       
    } catch (err) {
        res.send(err)
    }

})

router.get("/bookings",userAuth,async(req,res)=>{
    res.render("user/bookings")
})



module.exports = router