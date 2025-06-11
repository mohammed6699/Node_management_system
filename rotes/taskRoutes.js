import verifyToken from "../middleware/verifyToken.js";
import {
  deleteTask,
  updateTask,
  addTask,
  getAllTAsk
} from "../controllers/taskControllers.js";
import  {
  getTaskByDescription,
  getTaskByTitle,
  getTaskbyCategory,
} from "../controllers/searchTask.js";
import getFilterTask from "../controllers/filterTask.js"
import allowedTo from "../middleware/allowedTo.js";
import userRole from "../utils/UeerRole.js";
import express from "express";

const taskRouter = express.Router();
taskRouter
  .route("/")
  .get(getAllTAsk)
  .post(addTask)
  // .post(verifyToken, allowedTo(userRole.USER), addTask);
taskRouter
  .route("/:taskid")
  .patch(verifyToken, allowedTo(userRole.USER), updateTask)
  .delete(verifyToken, allowedTo(userRole.USER), deleteTask);
taskRouter.route("/filter").get(getFilterTask);
taskRouter.route("/:title").get(getTaskByTitle);
taskRouter.route("/:category").get(getTaskbyCategory);
taskRouter.route("/:description").get(getTaskByDescription);
export default taskRouter;
