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
        data: Buffer,
        contentType: String
    }, 
    likes : {
        type : Array, 
        default : []
    }, 
    comment : {
        type : {}
    }
},
{timestamps : true}
);

module.exports = mongoose.model("Post", PostSchema)