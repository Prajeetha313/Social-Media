const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User")
const multer = require('multer');
const getAccess = require('../auth/token_validation')

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
            userId : req.body.userId,
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
        if(post.userId === req.body.userId)
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
        if(post.userId === req.body.userId)
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
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes : req.body.userId}})
            res.status(200).json("Post has been liked")
        }
        else
        {
            await post.updateOne({$pull : {likes : req.body.userId}})
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

        if(userDetails.friend.includes(req.body.userId))
        {
            await user.updateOne({$push : {comment : {
                userId : req.body.userId, 
                comments : req.body.comments
            }}});
            res.status(200).json("You commented successfully on this post")
        }
        else if(user.userId === req.body.userId){
            await user.updateOne({$push : {comment : {
                userId : req.body.userId, 
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



// router.put("/:id/editComment", getAccess, async(req, res)=>{
//     try{
//         const postId = await Post.findById(req.params.id);
//         const postComment = postId.comment;

//         postComment.updateOne({userId : req.body.userId}, {$set : {comments : req.body.newComment}})
//         console.log(post);
//     }
//     catch(err)
//     {
//         res.status(00).json(err)
//     }
// })



router.delete("/:id/comment", getAccess, async(req, res)=>{
    try{
        const post = await Post.find({_id : req.params.id});
        console.log(req.body.userId);
        Post.updateMany(

            {_id: req.params.id},
            {$pull:{'comment':{userId:req.body.userId}}}
            
        );
        console.log(post)
        // if(post.comment.includes({userId : req.body.userId}))
        // {
        //     await post.updateOne({$pull : {comment:{userId : req.body.userId}}});
        //     res.status(200).json("The post has been deleted")
        // }
        // else{
        //     res.status(403).json("You can delete only your comment")
        // }
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
})

module.exports = router;