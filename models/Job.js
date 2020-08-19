const mongoose = require('mongoose');
const validator = require("validator")
const {nanoid} = require("nanoid")


const jobSchema = new mongoose.Schema({

    jobId: {
        type: String,
        default: () => nanoid(8)
      },

    
    service:{
        type:mongoose.Schema.Types.String,
        ref : "Service"
    },

    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    status:{
        type:String,
        default:"unappointed",
        enum : [accepted,rejected,unappointed,completed]
    },

    jobTime:{
        type:Date
    },

    // price:{
    //     type:Number
    // }

    

},{
    timestamps:true
})




const Service = mongoose.model("Service", serviceSchema)
module.exports = Service 