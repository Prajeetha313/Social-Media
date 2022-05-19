const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")
const multer = require('multer');
const getAccess = require('../auth/token_validation')
const Mongoose = require("mongoose")

const storage = multer.diskStorage({
    destination: 'uploads', 
    filename : (req, file, cb)=>{
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage }).single('testImage');



router.post('/upload', getAccess, async (req, res)=>{
    upload(req, res, async (err) =>{
        const newImage = await new Post({
            userId : req.session.userId,
            img : {
                data : req.file.filename,
                contentType : 'image/jpg' || 'image/png' || 'image/jpeg'
            },
            desc : req.body.desc
        })
        newImage.save()
        res.status(200).json("Post uploaded successfully")
    })
});

router.put("/:id", getAccess, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.session.userId)
        {
            await post.updateOne({$set : req.body});
            res.status(200).json("The post has been updated")
        }
        else{
            res.status(403).json("User can update only your post")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});


router.delete("/:id", getAccess, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.session.userId)
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

router.put("/:id/like", getAccess, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.session.userId)){
            await post.updateOne({$push: {likes : req.session.userId}})
            res.status(200).json("Post has been liked")
        }
        else
        {
            await post.updateOne({$pull : {likes : req.session.userId}})
            res.status(200).json("Post has been unliked")
        }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

router.get("/:id", getAccess, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id/comment", getAccess, async(req, res)=>{
    try{
        const user = await Post.findById(req.params.id);
        
        const userDetails = await User.findById(user.userId);

        if(userDetails.friend.includes(req.session.userId))
        {
            await user.updateOne({$push : {comment : {
                userId : req.session.userId, 
                comments : req.body.comments
            }}});
            res.status(200).json("You commented successfully on this post")
        }
        else if(user.userId === req.session.userId){
            await user.updateOne({$push : {comment : {
                userId : req.session.userId, 
                comments : req.body.comments
            }}});
            res.status(200).json("You commented successfully on this post")
        }
        else{
            res.status(403).json("You can't comment on this post")
        }
    }
    catch(err)
    {
        res.status(00).json(err)
    }
})



router.put("/:id/:commentId/editComment", getAccess, async(req, res)=>{
    try{
        const post = await Post.find({_id : req.params.id})
        const postC = post[0].comment
        let value = false;
        postC.forEach(async function(err, currComment){
            if(postC[currComment].userId === req.session.userId && (postC[currComment]._id).toString() === (req.params.commentId))
            {
                value = true;
                await Post.updateOne({
                    '_id' : req.params.id, 
                    "comment._id"  : req.params.commentId
                }, 
                {$set : {"comment.$.comments" : req.body.newComment}})
                res.status(200).json("Comment edited successfully")
            }
        })
        console.log(value)
            if(value === false)
            {res.status(403).json("You can update only your comment")}
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})



router.delete("/:id/:commentId/deletecomment", getAccess, async(req, res)=>{
    try{

        const post = await Post.find({_id : req.params.id})
        const postC = post[0].comment
        let value = false;
        postC.forEach(async function(err, currComment){
            if(postC[currComment].userId === req.session.userId && (postC[currComment]._id).toString() === (req.params.commentId))
            {
                value = true;
                await Post.updateOne(
                {'_id' : req.params.id}, 
                {$pull : {"comment" : {"_id" : req.params.commentId}}}
                ).then(results=>{
                    res.status(200).json("Comment deleted successfully");
                });
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