const jwt = require("jsonwebtoken");

// Create a Secret key to Verify Signature (JWT)
const JWT_SECRET = "HeyThisIsMyOrganization";

const fetchUser = (req, res, next) => {
    //Get the User from JWT Token and add it to req object.
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error : "Please authenticate with a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    }catch(error){
        res.status(401).send({error : "Please authenticate with a valid token"})
    }   
}

module.exports = fetchUser;