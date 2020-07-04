const mongoose = require('mongoose');
const validator = require("validator")

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
    tokens:[

    ]
},{
    timestamps:true
})

const Employee = mongoose.model("Employee", employeeSchema)
module.exports = Employee