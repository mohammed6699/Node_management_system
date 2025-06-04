// fiter un finished , pendding tasks
import taskModel from "../models/taskModel.js";
import { schedule } from "node-cron";
import taskModel from "../models/taskModel.js";
import userModels from "../models/userModels.js";
const sendMail = () => {
  try {
    taskModel.find({ status: "pendding" }).then((data) => {
      data.forEach((task) => {
        //nodemailer for task User.id
        //user.email
        console.log(task);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
const remiderTasks = schedule("* * * * * *",sendMail);
