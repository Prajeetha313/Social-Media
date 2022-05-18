const jwt = require("jsonwebtoken");


module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).json("Access Denied");

    try{
        const verified = jwt.verify(token, process.env.JWT_KEY);
        req.user = verified;

        if(req.session.auth){
            next();
        }
        else
        {
            req.session.error = "Action required : Login";
            res.json("Action required : Login")
        }
    }catch(err){
        res.status(400).json("Invalid Token")
    }
}