import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT;
const URL = process.env.MONGO_CONNECTION;
const app = express();
import taskRouter from "./rotes/taskRoutes.js";
import userRouter from "./rotes/userRotes.js";
import {getTaskByDescription,getTaskByTitle,getTaskbyCategory} from './controllers/searchTask.js'
import reminderRoute from "./rotes/reminderRoute.js"
/* import getFilterTask from './controllers/filterTask.js' */
mongoose.connect(URL).then(() => {
  console.log("Data Base Connected");
});
app.use(express.json());
app.use("/api/task", taskRouter);
app.use('/api/task/search/title/:title', getTaskByTitle)
app.use('/api/task/search/category/:category', getTaskbyCategory)
app.use('/api', reminderRoute)
/* app.use('/api/task/filter', getFilterTask) */
// login & signUp & getall

app.use("/api/user", userRouter);
app.listen(port, () => {
  console.log(`App is listing on port ${port}`);
});
