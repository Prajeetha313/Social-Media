const User = require("../models/User");
const Post = require("../models/Post");

const router = require("express").Router();
const bcrypt = require("bcrypt");
const getAccess = require('../middleware/token_validation')


/*-----View profile-----*/
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


/*-----View All Users-----*/
router.get("/viewAllUsers", getAccess, async(req, res)=>{
    try{
        const allProfile = [];
        const userId = req.payload._id;
        const user = await User.find({_id : {$ne : userId}});
        user.forEach(function(err, currUser){
            const newUser = user[currUser];
            const {password, updatedAt, createdAt, ...other} = newUser._doc
            allProfile.push(other);
        })
        return res.status(200).json(allProfile)
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Error!!")
    }
});


/*-----Delete Account-----*/
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


/*-----Change Password-----*/
router.post("/ChangeCurrentPassword", getAccess, async(req, res)=>{
    try{
        const user = await User.findById(req.payload._id);
        const salt = await bcrypt.genSalt(10);
        const comp = await bcrypt.compare(req.body.oldpassword.oldpassword, user.password)
        if(comp){
            const password = await bcrypt.hash(req.body.oldpassword.newpassword, salt);
            const updatedUser = await User.findByIdAndUpdate(req.payload._id, {
                $set : {password : password}, 
            });
            return res.status(200).json(updatedUser)
        }
        else {
            return res.status(403).json("Please enter current old password");
        }
    }
    catch(error) {
        return res.json(500).json(error);
    }
})


/*-----Update Profile-----*/
router.put("/UpdateProfile", getAccess, async(req, res)=>{
    try{
        const user = await User.findById(req.payload._id);

        user.username = req.body.username.username || user.username;
        user.mobile = req.body.username.mobile || user.mobile;
        user.desc = req.body.username.desc || user.desc;
        user.profileImg = req.body.username.profileImg || user.profileImg;

        const updatedUser = await user.save();
        const {password, updatedAt, createdAt, ...other} = updatedUser._doc
        return res.status(200).json(other)

    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
});


/*-----Get user by Id-----*/
router.get("/:id", getAccess, async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const post = await Post.find({userId : req.params.id});
        const {password, updatedAt, createdAt, ...other} = user._doc
        res.status(200).json({
            user : other, 
            post : post 
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});


/*-----Add or remove Friend-----*/
router.get("/:id/friend", getAccess, async(req, res)=>{
    if(req.payload._id !== req.params.id)
    {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.payload._id);
            if(!user.friend.includes(req.payload._id))
            {
                await user.updateOne({$push : {friend:req.payload._id}});
                await currentUser.updateOne({$push : {friend:req.params.id}});
                res.status(200).json(currentUser)
            }
            else
            {
                await user.updateOne({$pull : {friend:req.payload._id}});
                await currentUser.updateOne({$pull : {friend:req.params.id}});
                res.status(200).json(currentUser)
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