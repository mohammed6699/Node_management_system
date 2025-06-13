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
  const user = await User.find().populate("tasks").limit(limit).skip(end);
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
    const user = await User.findById(userId)
      .select("-password")
      .populate("tasks"); // exclude password

    if (!user) {
      return res.status(404).json({
        status: ERROR,
        message: "User not found",
      });
    }
//
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
  const { UserName, FirstName, LastName, email, password } = req.body;
  // check if user exists or not
  const user = await User.findOne({ UserName });
  if (user) {
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
    { expiresIn: "1d" }
  );
  user.token = token;
  res.status(201).json({ status: SUCCESS, data: { token } });
};
const updateUser = async (req, res) => {
  if(req.decodeToken._id !== req.params._id){
    return res.status(400).json({ status: ERROR, message: "Not allowed" });
  }
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { ...req.body } },
      { new: true }
    ).select("-password"); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({
        status: ERROR,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: SUCCESS,
      data: { updatedUser },
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR,
      message: "Server error",
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  if(req.decodeToken._id == req.params._id){
    return res.status(400).json({ status: ERROR, message: "Not allowed" });
  }
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        status: ERROR,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: SUCCESS,
      data: { title: "User deleted successfully" },
    });
  } catch (error) {
    res.status(500).json({
      status: ERROR,
      message: "Server error",
      error: error.message,
    });
  }
};

export { getAllUsers, registerUser, loginUser, getUserById, updateUser, deleteUser };
