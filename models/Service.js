const mongoose = require('mongoose');
const validator = require("validator")


// const serviceSchema = new mongoose.Schema({name:String})

const serviceSchema = new mongoose.Schema({

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
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }
})

// serviceSchema.pre('save', async function(next){
//     const user = this
//     if(user.isModified('password')){
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })




const Service = mongoose.model("Service", serviceSchema)
module.exports = Service 