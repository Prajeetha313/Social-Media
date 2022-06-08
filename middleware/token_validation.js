const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function (req, res, next){
    try{
            if(!req.headers['authorization'])
            {
                return res.json("Unauthorized user");
            }
            const authHeader = req.headers['authorization']
            const bearerToken = authHeader.split(' ')
            const token = bearerToken[1]
             jwt.verify(token, process.env.JWT_KEY, async (err, payload)=>{
                 if(err){
                     return res.json("Unauthorized user");
                 }
                 req.payload = payload
                const user = await User.findById(req.payload._id);
                if(user === null)
                {
                    return res.json("User not found");
                }
                else{
                 next()
                }
             })
        
    }catch(err){
        res.status(400).json("Invalid Token")
    }
}