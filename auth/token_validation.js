const jwt = require("jsonwebtoken");


module.exports = function (req, res, next){
    const token = req.header('auth-token');
    console.log(token)
    if(!token) return res.status(401).json("Access Denied");

    try{
        const verified = jwt.verify(token, process.env.JWT_KEY, function(err, decode){
            if(err){
                return res.json({success:false, message : "Login expires!!! Login Again to continue"})
            }
            else
            {
                if(req.session.auth){
    
                next()
                }
                else
                {
                    req.session.error = "Login again";
                    res.json({message : "login again to continue"})
                }
            }
        });
        
        
    }catch(err){
        res.status(400).json("Invalid Token")
    }
}