import {
  getAllUsers,
  registerUser,
  loginUser,
} from "../controllers/userControllers.js";
import express from "express";
const userRouter = express.Router();
import VerifyUser from "../middleware/verifyToken.js";
// get all users
userRouter.route("/").get(VerifyUser, getAllUsers);
// login user
userRouter.route("/login").post(loginUser);
// register user (add new user)
userRouter.route("/register").post(registerUser);
export default userRouter;
