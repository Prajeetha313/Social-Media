const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getAccess = require('../middleware/token_validation')

router.post("/register", async (req, res)=>{
    try{
        
            if(req.body.password === req.body.cpassword)
            {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);

                const newUser = new User({
                    username : req.body.username, 
                    email : req.body.email, 
                    password : hashedPassword,
                    mobile : req.body.mobile 
                });
                const user = await newUser.save();
                res.status(200).json({
                    message : "New Account created successfully"
                })
            }
            else
            {
                res.status(400).json({
                    message : "Password mismatch!!!"
                })
            }
    }catch(err)
    {
        res.status(500).json({
            message : "Already have an account"
        });
    }
});

router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({email : req.body.email});
        !user && res.status(404).json({
            message : "User not found"
        })
        if(user !== null)
        {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json({
                message : "Invalid Password"
            })
            if(validPassword !== false)
            {
                const token = jwt.sign({_id : user._id}, process.env.JWT_KEY, {expiresIn:"24h"});

                const Users = await User.find({'email' : req.body.email})
                if(Users!==null){
                    res.status(200).json(token)
                }
            }
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err);
    }
    
})


module.exports = router;