const jwt = require('jsonwebtoken');

function autheticateToken(req, res, next) {
    const token = req.header('authorization');
    if(!token){
        return res.status(401).json({message: 'You are unauthorized.'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).json({message: 'You are forbiddened to get access to this route'});
        }
        // add user from payload
        req.user = decoded;
        next();
    })
}

module.exports = autheticateToken;