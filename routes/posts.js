const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")
const multer = require('multer');
const getAccess = require('../middleware/token_validation')
const Mongoose = require("mongoose")


/*-----Upload Post-----*/
router.post('/upload', getAccess, async (req, res)=>{
    const newImage = await new Post({
        userId : req.payload._id, 
        img : req.body.img, 
        desc : req.body.desc
    })
    newImage.save();
    res.status(200).json("Post uploaded successfully")
});


/*-----Get all post of logged in user-----*/
router.get('/getAllPost', getAccess, async(req, res)=> {
    try{
        const post = await Post.find({userId:req.payload._id});
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
});


/*-----Home Page-View all post-----*/
router.get('/getEveryonesPost', getAccess, async(req, res)=>{
    try{
        const newArray = [];
        var count = 0;
        const post = await Post.find().sort({createdAt:-1});
        post.forEach(function(err, curr){
            User.findById(post[curr].userId).then((data)=>{
                const newDoc = {
                    'post' : post[curr], 
                    'username' : data.username, 
                    'profileImg' : data.profileImg
                }
                newArray.push(newDoc)
                count = count + 1;
                if(post.length === count)
                {
                    return res.status(200).json(newArray);
                }
            });
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})


/*-----Update Post-----*/
router.put("/:id", getAccess, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);

        post.img = post.img;
        post.userId = post.userId;
        post.desc = req.body.desc;
        
        const updatedPost = await post.save();
        return res.status(200).json(updatedPost)

    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
});


/*-----Delete Post-----*/
router.delete("/:id", getAccess, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.payload._id)
        {
            await post.deleteOne({$set : req.body});
            res.status(200).json("The post has been deleted")
        }
        else{
            res.status(403).json("You can delete only your post")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})


/*-----Like post-----*/
router.get("/:id/like", getAccess, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        await post.updateOne({$push: {likes : req.payload._id}})
        res.status(200).json(post)
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})


/*-----Unlike Post-----*/
router.get("/:id/unlike", getAccess, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        await post.updateOne({$pull : {likes : req.payload._id}})
        res.status(200).json(post)
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})


/*-----Get Post by Id-----*/
router.get("/:id", getAccess, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        const userDetails = await User.findById(post.userId);
        res.status(200).json({
            post : post, 
            username : userDetails.username, 
            userId : post.userId, 
            profileImg : userDetails.profileImg
        });
    }catch(err){
        res.status(500).json(err)
    }
})


/*-----Add Comment-----*/
router.put("/:id/comment", getAccess, async(req, res)=>{
    try{
        const user = await Post.findById(req.params.id);
        const user1 = await User.findById(req.payload._id);
        
        const userDetails = await User.findById(user.userId);

        if(userDetails.friend.includes(req.payload._id))
        {
            await user.updateOne({$push : {comment : {
                username : user1.username, 
                userId : req.payload._id, 
                comments : req.body.comment
            }}});
            const updatedPost = await Post.findById(req.params.id);
            res.status(200).json(updatedPost)
        }
        else if(user.userId === req.payload._id){
            await user.updateOne({$push : {comment : {
                username : user1.username, 
                userId : req.payload._id, 
                comments : req.body.comment
            }}});
            const updatedPost = await Post.findById(req.params.id);
            res.status(200).json(updatedPost)
        }
        else{
            res.status(403).json({
                "error" : "you cant comment on this post"
            })
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err)
    }
})


/*-----Edit Comment-----*/
router.put("/:id/:commentId/editComment", getAccess, async(req, res)=>{
    try{
        const post = await Post.find({_id : req.params.id})
        const postC = post[0].comment
        let value = false;
        postC.forEach(async function(err, currComment){
            if(postC[currComment].userId === req.payload._id && (postC[currComment]._id).toString() === (req.params.commentId))
            {
                value = true;
                await Post.updateOne({
                    '_id' : req.params.id, 
                    "comment._id"  : req.params.commentId
                }, 
                {$set : {"comment.$.comments" : req.body.newComment}})

                const updatedPost = await Post.findById(req.params.id);
                res.status(200).json(updatedPost)
            }
        })
        if(value === false)
        {
            res.status(403).json("You can update only your comment")
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err)
    }
})


/*-----Delete Comment-----*/
router.delete("/:id/:commentId/deletecomment", getAccess, async(req, res)=>{
    try{

        const post = await Post.find({_id : req.params.id})
        const postC = post[0].comment
        let value = false;
        postC.forEach(async function(err, currComment){
            if(postC[currComment].userId === req.payload._id && (postC[currComment]._id).toString() === (req.params.commentId))
            {
                value = true;
                await Post.updateOne(
                {'_id' : req.params.id}, 
                {$pull : {"comment" : {"_id" : req.params.commentId}}}
                )
                res.status(200).json("Comment deleted successfully");
            }
        })
        if(value === false)
        {
            res.status(403).json("You can delete only your comment")
        }
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
})

module.exports = router;