const User = require("../models/User");
const Post = require("../models/Post");

const router = require("express").Router();
const bcrypt = require("bcrypt");
const getAccess = require('../middleware/token_validation')



router.get("/viewProfile", getAccess, async(req, res)=>{
    try{
            const user = await User.findById(req.payload._id);
            const {password, updatedAt, createdAt, ...other} = user._doc
            res.status(200).json(other)
    }
    catch(err){
        res.status(500).json(err)
    }
});



router.get("/viewAllUsers", getAccess, async(req, res)=>{
    try{
        console.log(req.payload._id)
        const allProfile = [];
        const userId = req.payload._id;
        const user = await User.find({_id : {$ne : userId}});
        // const {password, updatedAt, createdAt, ...other} = user._doc
        user.forEach(function(err, currUser){
            const newUser = user[currUser];
            const {password, updatedAt, createdAt, ...other} = newUser._doc
            allProfile.push(other);
            console.log(allProfile)
        })
        res.status(200).json(allProfile)
    }
    catch(err){
        //res.status(500).json(err)
        console.log(err)
    }
});


router.get("/searchUser", getAccess, async(req, res)=>{
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



router.delete("/DeleteAccount", getAccess, async(req, res)=>{
        try{
            const post = await Post.find();
            post.forEach(async function(err, currPost){
                if(err){
                    console.log(err)
                }
                const newPost = post[currPost];
                if(newPost.likes.includes(req.payload._id))
                {
                    await newPost.updateOne({$pull : {likes : req.payload._id}})
                }
                const commentArr = newPost.comment;
                commentArr.forEach(async function(err, currComment){
                    if(err)
                    {
                        console.log(err);
                    }
                    if(commentArr[currComment].userId === req.payload._id)
                    {
                        await Post.updateOne(
                        {'_id' : req.params.id}, 
                        {$pull : {"comment" : {"userId" : req.payload._id}}}
                        )
                    }
                })
                if(newPost.userId === req.payload._id)
                {
                    await newPost.deleteOne({$set : req.body});
                }
            })
            await User.findByIdAndDelete(req.payload._id);
            res.status(200).json("Account has been deleted")
        }
        catch(err){
            return res.status(500).json(err)
        }
});

router.put("/UpdateProfile", getAccess, async(req, res)=>{
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
        const user = await User.findByIdAndUpdate(req.payload._id, {
            $set : req.body, 
        });
        res.status(200).json("Account has been updated")
    }
    catch(err){
        return res.status(500).json(err)
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





router.put("/:id/friend", getAccess, async(req, res)=>{
    if(req.payload._id !== req.params.id)
    {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.payload._id);
            console.log(user)
            if(!user.friend.includes(req.payload._id))
            {
                await user.updateOne({$push : {friend:req.payload._id}});
                await currentUser.updateOne({$push : {friend:req.params.id}});
                res.status(200).json("Successful")
            }
            else
            {
                await user.updateOne({$pull : {friend:req.payload._id}});
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