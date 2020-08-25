const express = require('express')
const router = express.Router()
const Employee = require('../models/Employee')
const empAuth = require('../middleware/employeeAuth')
const Service = require('../models/Service')

// employee Login Route
//      /employee/login

router.post("/login",async(req,res)=>{
    try{
        const employee = await Employee.findByCredentials(req.body.email, req.body.password)
        const token = await employee.generateAuthToken()
    
        res.cookie('token', token, {
            secure: false,
            httpOnly: true,
          });

          if(employee){
            res.redirect("/employees/me")
        }else{
            res.redirect("/")
        }
    } catch(err) {
        res.status(400).send(err)
    }
})

// employee register Route
//      /employee/register

router.post("/register",async (req,res)=>{

    const employee = new Employee(req.body)
    try {
        await employee.save()
        const token = await employee.generateAuthToken()

        res.cookie('token', token, {
            secure: false,
            httpOnly: true,
          });

          if(employee){
            res.redirect("/employees/me")
        }else{
            res.redirect("/")
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

 // employee Logout Route
//  POST    /employee/logout
router.post('/logout',empAuth,async(req,res)=>{
    try {
        req.employee.tokens = req.employee.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.employee.save()
        res.redirect("/")
    } catch (err) {
        res.status(500).send()
    }
})

// employee Logout All Route
//  POST    /employee/logoutAll
router.post('/logoutAll',empAuth, async(req,res)=>{
    try {
        req.employee.tokens = []
        await req.employee.save()
        res.redirect("/")
    } catch (err) {
        res.status(500).send()
    }
})


// employee profile Route
//          /employee/me

router.get("/me",empAuth, async(req,res)=>{
    const employee = req.employee
    res.render("employee/empDashboard",{employee})
 })

 // employee available bookings route
 //         /employees/availableBookings

 router.get("/availableBookings",empAuth,async(req,res)=>{
     const employee = req.employee
     res.render("employee/availableBookings",{
         employee
     })
 })

module.exports = router

