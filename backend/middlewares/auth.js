const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_JWT = process.env.SECRET_JWT


function verifyJWT(req, res, next){
    const token = req.headers['authorization']
    if(!token) res.status(401).json({
        auth: false,
        message: 'No token provided.'
    })

    jwt.verify(token, SECRET_JWT, function(err, decoded){
        if(err) return res.status(500).json({
            auth: false,
            message: 'Failed to authenticate token.'
        })

        req.userId = decoded.user_id
        next()
    })
}

module.exports = verifyJWT