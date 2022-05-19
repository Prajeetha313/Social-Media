const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

const session = require("express-session");
const cookiePraser = require("cookie-parser");

app.use(session({secret:"socialmediaapp", resave:false, saveUninitialized:false, cookie:{maxAge:1000*60*60*1}}))




dotenv.config();


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser : true, useUnifiedTopology : true}, ()=>{
    console.log("Connected to mongo");
});


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname))
app.use(helmet());
// app.use(morgan("common"));

app.use("/api/users", (userRoute));
app.use("/api/posts", (postRoute));
app.use("/api/auth", (authRoute));

app.listen(8800, ()=>{
    console.log("Backend server is running")
})