const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username : {
        type : String, 
        required : true, 
        min : 3, 
        max : 20, 
        unique : true
    }, 
    email : {
        type : String, 
        required : true, 
        max : 50, 
        unique : true
    }, 
    password : {
        type : String, 
        required : true, 
        min : 6
    }, 
    friend : {
        type : Array, 
        default : []
    }, 
    desc:{
        type : String, 
        max : 500, 
        default : ''
    }, 
    profileImg : {
        type : String,  
        default : 'http://127.0.0.1:8887/uploads/userImageDefault.png', 
    }, 
    mobile : {
        type : Number, 
        required : true, 
    }
},
{timestamps : true}
);

module.exports = mongoose.model("User", UserSchema)