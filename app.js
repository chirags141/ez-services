const express = require("express")
const ejs = require("ejs")
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const methodOverride = require('method-override');
const jwt = require("jsonwebtoken")
var cookieParser = require('cookie-parser')
const cors = require('cors');

//Load config
dotenv.config({path:"./config/config.env"})

// Connect Database
const connectDB = require('./config/db')
connectDB()

const app = express()

//Body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//cookie-parser
app.use(cookieParser())
app.use(cors());

// Method-override for PUT and DELETE
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

  // Views
app.set('views', path.join(__dirname, 'views'));

// Set view Engine
app.set('view engine', 'ejs');

//Static Folder
app.use(express.static(path.join(__dirname,'public')))

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const employeeRouter = require('./routes/employee')
const serviceRouter = require('./routes/service')

//Routes

app.use("/",indexRouter)
app.use('/users',userRouter)
app.use('/employees',employeeRouter)
app.use('/services',serviceRouter)

//PORT Number
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})