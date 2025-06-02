require('dotenv').config();
import User, { findOne, password as _password } from '../models/userModels';
import { ERROR, SUCCESS, FAIL } from '../utils/httpStatus';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
//find all users
const getAllUsers = async(req,res) => {
    // pagination 
    const query = req.query;
    const page = query.page;
    const limit = query.limit;
    const end = (page - 1)*limit;
    const user = await findOne().limit(limit).skip(end);
    if(!user){
        res.status(401).json({status: ERROR, data: {title: "This User is not exists"}})
    }
    res.status(201).json({status: SUCCESS, data: {user}})
}
// register a new user
const registerUser = async(req, res) => {
    const {UserName, FirstName, LastName, email, password, role, avatar} = req.body;
    // check if user exists or not
    const user = await findOne({UserName});
    if(user)[
        res.status(401).json({status: FAIL, data: {title: "THis user is already exists"}})
    ]
    const newUser = new User({
        UserName,
        FirstName,
        LastName,
        email,
        password,
        role,
        avatar
    })
    res.status(201).json({Status: SUCCESS, data: {newUser}})
}
// login user
const loginUser = async(req, res) => {
    const {UserName, password} = req.body;
    const user = await findOne({UserName});
    if(!user){
        res.status(401).json({status: ERROR, data: {title: "This user is not exists"}});
    }
    const enteredPass = compareSync(password, _password)
    if(!enteredPass){
        res.status(401).json({status: ERROR, data: {title: "Authentication Errors"}});
    }
    // generate jwt token
    const token = await sign({email: user.email, _id: user._id, role: user.role}, process.env.JWT_TOKEN, {expiresIn: '10m'})
    user.token = token;
    res.status(201).json({status: SUCCESS, data: {token}})
}
export default {
    getAllUsers,
    registerUser,
    loginUser
}