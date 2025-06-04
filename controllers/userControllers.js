import dotenv from "dotenv";
dotenv.config();
import User from "../models/userModels.js";
import { ERROR, SUCCESS, FAIL } from "../utils/http-status.js";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
//find all users
const getAllUsers = async (req, res) => {
  // pagination
  const query = req.query;
  const page = query.page;
  const limit = query.limit;
  const end = (page - 1) * limit;
  const user = await User.findOne().limit(limit).skip(end);
  if (!user) {
    res
      .status(401)
      .json({ status: ERROR, data: { title: "This User is not exists" } });
  }
  res.status(201).json({ status: SUCCESS, data: { user } });
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({
        status: ERROR,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: SUCCESS,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR,
      message: "Server error",
      error: error.message,
    });
  }
};
// register a new user
const registerUser = async (req, res) => {
  const { UserName, FirstName, LastName, email, password} =
    req.body;
  // check if user exists or not
  const user = await User.findOne({ UserName });
  if (user){
    return res.status(401).json({
        status: "FAIL",
        data: { title: "This user already exists" },
      });
  }
  const newUser = new User({
    UserName,
    FirstName,
    LastName,
    email,
    password,
  });
  await User.create(newUser);
  res.status(201).json({ Status: SUCCESS, data: { newUser } });
};
// login user
const loginUser = async (req, res) => {
  const { UserName, password } = req.body;
  const user = await User.findOne({ UserName });
  if (!user) {
    res
      .status(401)
      .json({ status: ERROR, data: { title: "This user is not exists" } });
  }
  const enteredPass = compareSync(password, user.password);
  if (!enteredPass) {
    res
      .status(401)
      .json({ status: ERROR, data: { title: "Authentication Errors" } });
  }
  // generate jwt token
  const token = await jwt.sign(
    { email: user.email, _id: user._id, role: user.role },
    process.env.JWT_TOKEN,
    { expiresIn: "10m" }
  );
  user.token = token;
  res.status(201).json({ status: SUCCESS, data: { token } });
};
export  {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById
};
