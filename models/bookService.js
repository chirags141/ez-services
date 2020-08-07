const mongoose = require('mongoose');
const validator = require("validator")


// const serviceSchema = new mongoose.Schema({name:String})

const bookServiceSchema = new mongoose.Schema({

    // transactionID :{
    //     type:String  
    // },

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
        enum: ['appointed',"unappointed",'accepted','rejected'] 
    },
    

    createdAt:{
        type:Date,
        default:Date.now()
    }
})




const BookService = mongoose.model("BookService", bookServiceSchema)
module.exports = BookService 