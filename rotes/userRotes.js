const userControllers = require('../controllers/userControllers')
const express = require('express')
const router = express.Router();
const VerifyUser = require('../middleware/verifyToken')
// get all users
router.route('/')
            .gtet(VerifyUser ,userControllers.getAllUsers)
// login user
router.route('/login')
            .post(userControllers.loginUser)
// register user (add new user)
router.route('/register')
            .post(userControllers.registerUser)