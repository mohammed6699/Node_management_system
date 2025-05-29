require('dotenv').config();
const User = require('../models/userModels');
const HTTPSTATUS = require('../utils/httpStatus')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//find all users
const getAllUsers = async(req,res) => {
    // pagination 
    const query = req.query;
    const page = query.page;
    const limit = query.limit;
    const end = (page - 1)*limit;
    const user = await User.findOne().limit(limit).skip(end);
    if(!user){
        res.status(401).json({status: HTTPSTATUS.ERROR, data: {title: "This User is not exists"}})
    }
    res.status(201).json({status: HTTPSTATUS.SUCCESS, data: {user}})
}
// register a new user
const registerUser = async(req, res) => {
    const {UserName, FirstName, LastName, email, password, role, avatar} = req.body;
    // check if user exists or not
    const user = await User.findOne({UserName});
    if(user)[
        res.status(401).json({status: HTTPSTATUS.FAIL, data: {title: "THis user is already exists"}})
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
    res.status(201).json({Status: HTTPSTATUS.SUCCESS, data: {newUser}})
}
// login user
const loginUser = async(req, res) => {
    const {UserName, password} = req.body;
    const user = await User.findOne({UserName});
    if(!user){
        res.status(401).json({status: HTTPSTATUS.ERROR, data: {title: "This user is not exists"}});
    }
    const enteredPass = bcrypt.compareSync(password, User.password)
    if(!enteredPass){
        res.status(401).json({status: HTTPSTATUS.ERROR, data: {title: "Authentication Errors"}});
    }
    // generate jwt token
    const token = await jwt.sign({email: user.email, _id: user._id, role: user.role}, process.env.JWT_TOKEN, {expiresIn: '10m'})
    user.token = token;
    res.status(201).json({status: HTTPSTATUS.SUCCESS, data: {token}})
}
module.exports = {
    getAllUsers,
    registerUser,
    loginUser
}