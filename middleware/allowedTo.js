// user roles and admin
import { ERROR } from '../utils/httpStatus'
export default (...role) => {
    return (req, res, next) => {
        if(!req.decodeToken.role){
            res.status(402).json({status: ERROR, data: {title: "non-authorized role"}})
        }
        next()
    }
}