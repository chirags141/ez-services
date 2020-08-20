const express = require('express')
const router = express.Router()
const moment = require("moment")
const _ = require('lodash')
const userAuth = require("../middleware/userAuth")
const User = require('../models/User')
const Service = require("../models/Service")

// user Login Route
// POST     /users/login

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
// POST /users/register

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
//  GET    /users/me

router.get("/me",userAuth, async(req,res)=>{
   const user = req.user
    res.render("user/userDashboard",{user})
})


// user Logout Route
//  GET    /users/logout
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
//  GET    /users/logoutAll
router.get('/logoutAll',userAuth, async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.redirect("/")
    } catch (err) {
        res.status(500).send()
    }
})

/* ------------------------------------------------------------------------------ */

// Book a service
// GET /users/service
router.get('/service',userAuth,async(req,res)=>{
    const user = req.user
    res.render("user/service",{user})
})

// posting  Service by Users
// POST /users/service

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
        user :req.user.id  
    })
    try {
        await service.save()
        res.redirect("/users/bookings")       
    } catch (err) {
        res.send(err)
    }
    
})

// Get Service by ID
// GET /users/service/:id
router.get("/service/:id",userAuth,async(req,res)=>{
    try {
        const bookingId = req.params.id
        const user = req.user
        const service = await Service.findOne({bookingId, user:user.id});

        res.render("user/bookingId",{
            user,
            service,
            moment,
            _
        })
    } catch (err) {
        res.send(err) 
    }
})


// Deleting Service by ID
// DELETE /users/service/:id

router.delete("/service/:id", userAuth ,async(req,res)=>{
    try {
        await Service.deleteOne({ bookingId: req.params.id , user: req.user.id })
        res.redirect("/users/bookings")

    } catch (e) {
        res.status(500).send(e)
    }
})


/* ------------------------------------------------------------------------------ */

router.get("/bookings",userAuth,async(req,res)=>{
    const user = req.user;
    const bookings = await Service.find({user:user.id})

    .sort({createdAt:'desc'})
    .lean()

    res.render("user/bookings",{
        user,
        bookings,
        moment,
        _
    })
})

// ----------------------------------------------------------------------------------------------

router.get("/status",userAuth,async(req,res)=>{
    const user = req.user;
    const bookingId = req.query.bookingId
    const service = await Service.findOne({bookingId}).exec()

    // More code to be updated


    res.render("user/status.ejs",{user,service})
})




module.exports = router