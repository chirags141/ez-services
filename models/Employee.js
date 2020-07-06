const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require('bcryptjs')


// const serviceSchema = new mongoose.Schema({name:String})

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim : true
    },
    username:{
        type:String, 
        unique:true,
        minlength:5,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength: 5,
        trim:true
    },

    address:{
        type:String
    },
    phone:{
        type:Number,
        min : 10
    },

    verification:{
        type:String
    },

    serviceCategory : {
        type:Array
    },
    tokens:[

    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

employeeSchema.statics.findByCredentials = async (email , password )=>{
    const employee = await Employee.findOne({$or : [ {email : email },{username : email} ]})


    if(!employee){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, employee.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return employee
}



//  Hash the plain text password before saving
employeeSchema.pre('save', async function(next){
    const employee = this
    if(employee.isModified('password')){
        employee.password = await bcrypt.hash(employee.password, 8)
    }
    next()
})


const Employee = mongoose.model("Employee", employeeSchema)
module.exports = Employee