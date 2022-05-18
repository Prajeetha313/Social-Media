const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const onehour = 1000 * 60 * 60 * 1;
router.use(session({secret:"socialmediaapp", resave:false, saveUninitialized:false, cookie:{maxAge:onehour}}))


router.post("/register", async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username : req.body.username, 
            email : req.body.email, 
            password : hashedPassword, 
        });
        const user = await newUser.save();
        res.status(200).json("New Account created successfully")
    }catch(err)
    {
        res.status(500).json("Already have an account");
    }
});

router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({email : req.body.email});
        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Invalid Password")

        const token = jwt.sign({_id : user._id}, process.env.JWT_KEY);

        req.session.auth = true
        
        res.header('auth-token', token).send(token);
        // res.status(200).json(token)
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

router.get('/logout', async (req, res)=>{
    req.session.destroy(async function(err){
        if(err) throw err
        else
        {
            res.status(200).json("Logged out successfully")
        }
    })
})


module.exports = router;