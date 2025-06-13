import {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
import express from "express";
import verifyToken from '../middleware/verifyToken.js'
const userRouter = express.Router();
// import VerifyUser from "../middleware/verifyToken.js";
// get all users
userRouter.get("/",getAllUsers);
// login user
userRouter.post("/login",loginUser);
// register user (add new user)
userRouter.post("/register",registerUser);
userRouter.get("/:id",getUserById);
userRouter.patch("/:id", verifyToken,updateUser);
userRouter.delete("/:id", verifyToken,deleteUser)
export default userRouter;
//Complete Project Report