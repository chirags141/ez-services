const mongoose = require('mongoose');
const validator = require("validator")
const {nanoid} = require("nanoid")


// const serviceSchema = new mongoose.Schema({name:String})

const serviceSchema = new mongoose.Schema({

    _id: {
        type: String,
        default: () => nanoid(6)
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
        enum: ['appointed',"unappointed",'accepted','rejected','completed','inprogress'] 
    },
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },


},{
    timestamps:true
})

serviceSchema.pre('save', async function(next){
    const service = this
    if(service.typeOfService == "electrician"){
        service._id = "E-" + service._id
    } else if(service.typeOfService == "plumber"){
        service._id = "P-" + service._id
    }else if(service.typeOfService == "carpenter"){
        service._id = "C-" + service._id
    }
    next()
})


const Service = mongoose.model("Service", serviceSchema)
module.exports = Service 