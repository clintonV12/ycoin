const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
    //get token from request header
    const authHeader = req.headers["authorization"];
    //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
    const token = authHeader.split(" ")[1];
    
    if (token == null) res.sendStatus(400).send("Token not present")
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { 
            res.status(403).send("Token invalid");
        }
        else {
            req.user = user;
            next(); //proceed to the next action in the calling function
        }
    }); //end of jwt.verify()

} //end of function

module.exports = validateToken;