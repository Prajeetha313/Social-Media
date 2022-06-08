const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userId: {
        type :String, 
        required:true
    }, 

    desc : {
        type : String, 
        max : 500
    }, 
    img : {
        type : String, 
    }, 
    likes : {
        type : Array, 
        default : []
    }, 
    comment : {
        type : [
            {
                username : {type : String}, 
                userId : {type : String}, 
                comments : {type : String}
            }
        ]
    }
},
{timestamps : true}
);

module.exports = mongoose.model("Post", PostSchema)