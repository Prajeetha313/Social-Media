const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const cors = require('cors')


dotenv.config();


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser : true, useUnifiedTopology : true}, ()=>{
    console.log("Connected to mongo");
});

app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
})



// app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname))
app.use(helmet());

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));

// app.use(morgan("common"));

app.use(cors())

app.use("/api/users", (userRoute));
app.use("/api/posts", (postRoute));
app.use("/api/auth", (authRoute));

app.listen(8800, ()=>{
    console.log("Backend server is running")
})