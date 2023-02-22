//Basic Lib Import
const express = require("express");
const router = require("./src/routes/api")
const app = new express();
const bodyParser = require("body-parser")
const path = require("path")
require("dotenv").config();


//Security Middleware Lib Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean")
const hpp = require("hpp")
const cors = require("cors");


//Datbase Lib Import
const mongoose=require("mongoose");
app.use(express.static("client/build"))
//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss())
app.use(hpp());


//Body Perser Implement

app.use(bodyParser.json())

//Request Rate Limit
const limiter = rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

//Mongo DB Database Connection
mongoose.connect(process.env.DATABASE)
.then(()=>console.log("DB connected successfully"))
.catch((err)=>console.log("DB connected error",err))

//Routig Implement 
app.use("/api/v1",router)

//Add React Front End Routing
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"))

})
// server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App is  running on port ${port}`);
});
module.exports=app;