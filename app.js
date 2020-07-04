const express = require("express")
const ejs = require("ejs")
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const connectDB = require('./config/db')

//Load config
dotenv.config({path:"./config/config.env"})

connectDB()

const app = express()

//Body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// Views
app.set('views', path.join(__dirname, 'views'));

// Set view Engine
app.set('view engine', 'ejs');

//Static Folder
app.use(express.static(path.join(__dirname,'public')))



const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const employeeRouter = require('./routes/employee')



//Routes

app.use("/",indexRouter)
app.use('/user',userRouter)
app.use('/employee',employeeRouter)




//PORT Number
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})