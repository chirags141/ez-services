const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

    serviceCategory : {
        type:Array
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }],

},{
    timestamps:true
})

employeeSchema.methods.generateAuthToken = async function(){
    const employee = this
    const token = jwt.sign({_id : employee._id.toString()},process.env.AUTH_SIGNATURE)

    employee.tokens = employee.tokens.concat({token})
    await employee.save()

    return token 
}


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