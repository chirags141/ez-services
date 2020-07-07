const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    
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
    tokens:[{
        token:{
            type:String,
            required:true
        } 
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id : user._id.toString() },process.env.AUTH_SIGNATURE)

    user.tokens = user.tokens.concat({token})
    await user.save()
    
    return token
}


userSchema.statics.findByCredentials = async (email , password )=>{
    const user = await User.findOne({$or : [ {email : email },{username : email} ]})
    // const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}


//  Hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User   