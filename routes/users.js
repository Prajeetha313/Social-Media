const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const getAccess = require('../auth/token_validation')

router.delete("/:id", getAccess, async(req, res)=>{
    if(req.session.userId === req.params.id)
    {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted")
        }
        catch(err){
            return res.status(500).json(err)
        }
    }
    else
    {
        return res.status(403).json("You can delete only your account")
    }
});

router.put("/:id", getAccess, async(req, res)=>{
    if(req.session.userId === req.params.id)
    {
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set : req.body, 
            });
            res.status(200).json("Account has been updated")
        }
        catch(err){
            return res.status(500).json(err)
        }
    }
    else
    {
        return res.status(403).json("You can update only your account")
    }
});

router.get("/:id", getAccess, async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, createdAt, ...other} = user._doc
        res.status(200).json(other)
    }
    catch(err){
        res.status(500).json(err)
    }
});

router.get("/:id/viewProfile", getAccess, async(req, res)=>{
    try{
        if(req.params.id === req.session.userId)
        {
            const user = await User.findById(req.params.id);
            const {password, updatedAt, createdAt, ...other} = user._doc
            res.status(200).json(other)
        }
        else
        {
            res.status(403).json("Id mismatch")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
});

router.get("/:id/viewAllUsers", getAccess, async(req, res)=>{
    try{
        const allProfile = [];
        const userId = req.session.userId;
        const user = await User.find({_id : {$ne : userId}});
        // const {password, updatedAt, createdAt, ...other} = user._doc
        user.forEach(function(err, currUser){
            const newUser = user[currUser];
            const {password, updatedAt, createdAt, ...other} = newUser._doc
            allProfile.push(other);
        })
        res.status(200).json(allProfile)
    }
    catch(err){
        //res.status(500).json(err)
        console.log(err)
    }
});

router.get("/:id/searchUser", getAccess, async(req, res)=>{
    try{
        const searchUsername = req.body.searchUsername;
        const getUser = await User.findOne({"username" : searchUsername});
        if(getUser !== null){
            const {password, updatedAt, createdAt, ...other} = getUser._doc
            res.status(200).json(other)
        }
        else{
            res.status(403).json("User not found")
        }
    }
    catch(err)
    {
        res.status(500).json(err)
        console.log(err)
    }
});


router.put("/:id/friend", getAccess, async(req, res)=>{
    if(req.session.userId !== req.params.id)
    {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.session.userId);
            console.log(user)
            if(!user.friend.includes(req.session.userId))
            {
                await user.updateOne({$push : {friend:req.session.userId}});
                await currentUser.updateOne({$push : {friend:req.params.id}});
                res.status(200).json("Successful")
            }
            else
            {
                await user.updateOne({$pull : {friend:req.session.userId}});
                await currentUser.updateOne({$pull : {friend:req.params.id}});
                res.status(200).json("unfriend Successfully")
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json("error")
        }
    }
    else
    {
        res.status(403).json("You can't follow/unfollow yourself")
    }
})



module.exports = router;