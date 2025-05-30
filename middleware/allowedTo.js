// user roles and admin
const HTTPSTATUS = require('../utils/httpStatus')
module.exports = (...role) => {
    return (req, res, next) => {
        if(!req.decodeToken.role){
            res.status(402).json({status: HTTPSTATUS.ERROR, data: {title: "non-authorized role"}})
        }
        next()
    }
}