const express = require('express')
const router = express.Router()
const BookService = require("../models/bookService")
router.get("/",(req,res)=>{
    res.render("bookService")
})


router.post("/",async (req,res)=>{

    const service = new BookService({
        name : req.body.name,
        email: req.body.email,
        mobile :req.body.mobile,
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        typeOfService : req.body.bookService,
        subServices : req.body.electrician || req.body.plumber || req.body.carpenter,
        description : req.body.description
    })
    try {
        await service.save() 
        res.send(service)       
    } catch (err) {
        res.send(err)
    }

})


module.exports = router