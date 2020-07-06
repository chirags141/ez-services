const express = require('express')
const router = express.Router()
const Employee = require('../models/Employee')

// employee Login Route
//      /employee/login

router.post("/login",async(req,res)=>{
    try{
        const employee = await Employee.findByCredentials(req.body.email, req.body.password)
        console.log(employee);
        res.send("Logged in as Employee")
    } catch(err) {
        res.send(err)
    }
})

// employee register Route
//      /employee/register

router.post("/register",async (req,res)=>{
    
    const employee = new Employee(req.body)
    try {
        await employee.save()
        res.send("Registering Employee")
    } catch (err) {
        res.send(err)
    }
})

module.exports = router

