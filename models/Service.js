const mongoose = require('mongoose');
const validator = require("validator")
const {nanoid} = require("nanoid")


// const serviceSchema = new mongoose.Schema({name:String})

const serviceSchema = new mongoose.Schema({

    bookingId: {
        type: String,
        default: () => nanoid(8)
      },

    name:{
        type:String,
        trim : true
    },
    
    email:{
        type:String,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
  
    mobile:{
        type:Number,
        min : 10
    },
    
    address:{
        type:String
    },

    city:{
        type:String
    },

    state : {
        type:String
    },

    typeOfService : {
        type:String
    },

    subServices:{
        type:Array
    },

    description: {
        type:String
    },

    status:{
        type:String,
        default:"unappointed",
        enum: ['appointed',"unappointed",'rejected','completed'] 
    },
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },


},{
    timestamps:true
})

// serviceSchema.pre('save', async function(next){
//     const service = this
//     if(service.typeOfService == "electrician"){
//         service.bookingId = "E-" + service.bookingId
//     } else if(service.typeOfService == "plumber"){
//         service.bookingId = "P-" + service.bookingId
//     }else if(service.typeOfService == "carpenter"){
//         service.bookingId = "C-" + service.bookingId
//     }
//     next()
// })


const Service = mongoose.model("Service", serviceSchema)
module.exports = Service 