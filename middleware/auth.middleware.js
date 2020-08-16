const jwt = require('jsonwebtoken')
const secret = require('../config/default.json').secret

module.exports = (req, res, next) => {
    
    if(req.method === 'OPTIONS'){
        next()
    }
    try {
        let token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'You are not authenticated'})
        }
        let decoded = jwt.verify(token, secret)
        req.auth = decoded
        next()
    } catch (error) {
        return res.status(401).json({message: 'You are not authenticated'})
    }
}