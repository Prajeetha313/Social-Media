const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getAccess = require('../middleware/token_validation')

router.post("/register", async (req, res)=>{
    try{
        console.log(req.body)
        const Users1 = await User.findOne({'email' : req.body.username.email})
        const Users2 = await User.findOne({'username' : req.body.username.username})
        if(Users1 === null && Users2 === null)
        {
            const salt = await bcrypt.genSalt(10);
            // const hashedPassword = await bcrypt.hash(req.body.password, salt);
            await bcrypt.hash(req.body.username.password, salt, async (err, hashedPassword)=>{
                if(err) {console.log(err)}
                const newUser = await new User({
                    username : req.body.username.username, 
                    email : req.body.username.email, 
                    password : hashedPassword,
                    mobile : req.body.username.mobile 
                });
                const user = await newUser.save();
                res.status(200).json({
                    "user" : user
                })
            })
        }
        else{
            if(Users1 !== null)
            {
                res.status(402).json({
                    message : "Already have an account"
                })
            }
            else if(Users2 !== null) {
                res.status(409).json({
                    message : "Username already exists"
                })
            }
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
            message : err
        });
    }
});

router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({email : req.body.email.email});
        // console.log(user)
        !user && res.status(404).json({
            message : "User not found"
        })
        if(user !== null)
        {
            const validPassword = await bcrypt.compare(req.body.email.password, user.password)
            !validPassword && res.status(400).json({
                message : "Invalid Password"
            })
            // console.log(validPassword)
            if(validPassword !== false)
            {
                const token = jwt.sign({_id : user._id}, process.env.JWT_KEY, {expiresIn:"24h"});
                const Users = await User.find({'email' : req.body.email.email})
                console.log(Users)
                if(Users!==null){
                    return res.status(200).json({"token": token, "user" : Users})
                }
            }
        }
        console.log("Logged In")
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err);
    }
    
})


module.exports = router;