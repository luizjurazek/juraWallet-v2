const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET


function verifyJWT(req, res, next){
    const token = req.headers['authorization']
    if(!token) res.status(401).json({
        auth: false,
        message: 'No token provided.'
    })

    jwt.verify(token, SECRET, function(err, decoded){
        if(err) return res.status(500).json({
            auth: false,
            message: 'Failed to authenticate token.'
        })

        req.userId = decoded.id
        next()
    })
}

module.exports = verifyJWT