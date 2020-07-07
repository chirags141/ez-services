const jwt = require('jsonwebtoken')
const User = require('../models/User')


const userAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token,process.env.AUTH_SIGNATURE)
        const user = await User.findOne({_id : decoded._id,"tokens.token":token})
        
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (err) {
        res.status(401).send({error : "Please authenticaTE"})
    }
}

module.exports = userAuth