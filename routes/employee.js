const express = require('express')
const router = express.Router()
const moment = require("moment")
const _ = require('lodash')
const Employee = require('../models/Employee')
const empAuth = require('../middleware/employeeAuth')
const Service = require('../models/Service')
const Job = require("../models/Job")

// employee Login Route
//      /employee/login

router.post("/login", async (req, res) => {
    try {
        const employee = await Employee.findByCredentials(req.body.email, req.body.password)
        const token = await employee.generateAuthToken()

        res.cookie('token', token, {
            secure: false,
            httpOnly: true,
        });

        if (employee) {
            res.redirect("/employees/me")
        } else {
            res.redirect("/")
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

// employee register Route
//      /employee/register

router.post("/register", async (req, res) => {

    const employee = new Employee(req.body)
    try {
        await employee.save()
        const token = await employee.generateAuthToken()

        res.cookie('token', token, {
            secure: false,
            httpOnly: true,
        });

        if (employee) {
            res.redirect("/employees/me")
        } else {
            res.redirect("/")
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

// employee Logout Route
//  GEt    /employee/logout
router.get('/logout', empAuth, async (req, res) => {
    try {
        req.employee.tokens = req.employee.tokens.filter((token) => {
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
router.get('/logoutAll', empAuth, async (req, res) => {
    try {
        req.employee.tokens = []
        await req.employee.save()
        res.redirect("/")
    } catch (err) {
        res.status(500).send()
    }
})


// employee profile Route
//  GET        /employee/me

router.get("/me", empAuth, async (req, res) => {
    const employee = req.employee
    res.render("employee/empDashboard", {
        employee
    })
})

// employee available bookings route
// GET        /employees/availableBookings

router.get("/availableBookings", empAuth, async (req, res) => {
    const employee = req.employee
    const bookings = await Service.find({
            status: 'unappointed'
        })
        .sort({
            createdAt: 'asc'
        })
        .lean()

    res.render("employee/availableBookings", {
        employee,
        bookings,
        moment,
        _
    })
})

// employee available_service id route
// GET        /employees/available_service/:id

router.get("/available_service/:id", empAuth, async (req, res) => {
    try {
        serviceId = req.params.id
        const employee = req.employee
        const service = await Service.findOne({
            bookingId: serviceId
        })

        res.render("employee/availableBookingId", {
            service,
            employee,
            moment,
            _
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

// employee available bookings route
// POST        /employees/availableBookings

router.post("/available_service/:id", empAuth, async (req, res) => {

    const jobDate = req.body.jobDate;
    const serviceId = req.params.id

    // Updating status of Service as appointed
    const service1 = await Service.findOneAndUpdate({
        bookingId: serviceId
    }, {
        status: "appointed"
    })

    // Updated status service
    const service = await Service.findOne({
        bookingId: serviceId
    })

    //Creating a new Job 
    const job = new Job({
        service: service._id,
        employee: req.employee._id,
        user: service.user,
        status: "appointed",
        jobDate : jobDate
    })

    try {
        await job.save();
        res.redirect('/employees/currentBookings')
        //Redirecting to Current Bookings
    } catch (e) {
        res.status(404).send(e)
    }

})

// employee current bookings route
// GET        /employees/currentBookings

router.get("/currentBookings", empAuth ,async (req,res)=>{
    const employee = req.employee
    const jobs = await Job.find({employee:employee._id, status:"appointed" })
                            .sort({jobDate : "asc"})
                            .populate({path:'service', select : '-user'})
                            .populate({path:'user', select : '-password -tokens '})
                            .populate({path:'employee', select : '-password -tokens '})
                            .exec()
                            
    
    // res.send(jobs)
    res.render("employee/currentBookings",{
        jobs,
        employee,
        moment,
        _
    })
})

// employee current bookings with id route
// GET        /employees/currentBookings/:id
router.get("/currentBookings/:id", empAuth, async (req, res) => {
    try {
        const jobId = req.params.id;
        const employee = req.employee;
        const job = await Job.findOne({
            jobId
        });

        res.send(job);

        

        // res.render("employee/currentBookingId", {
        //     service,
        //     employee,
        //     moment,
        //     _
        // })
    } catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router