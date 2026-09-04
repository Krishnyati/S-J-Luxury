//Importing JWT Token
const jwt = require("jsonwebtoken");

//Authorization MiddleWare
const protect = (req, res, next) =>
{
    try{
        //Get Token From AUthorization Header
        const authHeader = req.headers.authorization;

        //check if token exoists
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Please Login Or Register First Then Come Again......"
            });
        }

        //Get Token
        const token = authHeader.split(" ")[1];

        //Verify The Tokens
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        
        //Stores User ID in request
        req.userId = decoded.userId;

        //Continue to Next Function
        next();
    }

    catch(error){
        res.status(401).json({
            message: "INvalid Token Or Expired Token "
        });
    }
};

//Export Middleware
module.exports = protect;
