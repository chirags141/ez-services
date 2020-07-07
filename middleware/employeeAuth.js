const jwt = require('jsonwebtoken')
const Employee = require('../models/Employee')


const employeeAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token,process.env.AUTH_SIGNATURE)
        const employee = await Employee.findOne({_id : decoded._id,"tokens.token":token})
        
        if(!employee){
            throw new Error()
        }
        
        req.token = token
        req.employee = employee
        next()
    } catch (err) {
        res.status(401).send({error : "Please authenticate"})
    }
}

module.exports = employeeAuth