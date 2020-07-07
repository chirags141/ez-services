const express = require('express')
const router = express.Router()
const Employee = require('../models/Employee')
const employeeAuth = require('../middleware/employeeAuth')
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
        const token = await employee.generateAuthToken()

        res.cookie('token', token, {
            secure: false,
            httpOnly: true,
          });

        res.send("Registering Employee")
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get("/me",employeeAuth, async(req,res)=>{
    const employee = req.employee
     res.send(employee)
 })

module.exports = router

