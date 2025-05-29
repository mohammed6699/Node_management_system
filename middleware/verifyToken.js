// user Authorization
require('dotenv').config();
const JWT = require('jsonwebtoken');
const HTTpStatus = require('../utils/httpStatus');
const VerifyUser = (req, res, next) => {
    const token = req.headers('Authorization') || req.headers('authorization');
    if(!token){
        res.satatus(402).json({status: HTTpStatus.ERROR, data: {title: "Token is required"}});
    }
    const reqToken = token.split(' ')[1];
    try {
        const decodeToken = JWT.verify(reqToken, process.env.JWT_TOKEN);
        decodeToken = req.decodeToken
        next()
    } catch (error) {
        res.satatus(402).json({status: HTTpStatus.ERROR, data:{title: "Unothorized Token"}})
    }
}