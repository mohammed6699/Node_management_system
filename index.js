import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT;
const URL = process.env.MONGO_CONNECTION;
const app = express();
import taskRouter from "./rotes/taskRoutes.js";
import userRouter from "./rotes/userRotes.js";
/* const serchTAsk = require('./controllers/searchTask') */
/* import getFilterTask from './controllers/filterTask.js' */
mongoose.connect(URL).then(() => {
  console.log("Data Base Connected");
});
app.use(express.json());
app.use("/api/task", taskRouter);
/* app.use('/api/task/search', serchTAsk) */
/* app.use('/api/task/filter', getFilterTask) */
// login & signUp & getall

app.use("/api/user", userRouter);
app.listen(port, () => {
  console.log(`App is listing on port ${port}`);
});
