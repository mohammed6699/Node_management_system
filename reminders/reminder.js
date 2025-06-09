// fiter un finished , pendding tasks
import { schedule } from "node-cron";
import taskModel from "../models/taskModel.js";
import userModels from "../models/userModels.js";
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., Gmail, Yahoo, Outlook, or use "host", "port", etc. for SMTP
  auth: {
    user: "replaceHere",
    pass: "replace Here App passwords",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const sendAlert = () => {
  try {
    console.log("Reminder email sent");

    taskModel.find({ progress: "INPROGRESS" }).then((data) => {
      data.forEach(async (task) => {
        const email = await userModels.findById(task.user).then((user) => {
          return user.email;
        });
        console.log(email);
        sendEmail(email, task.Title);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
const remiderTasks = schedule("*/10 * * * * *", sendAlert);
const sendEmail = async (userEmail, taskName) => {
  const mailOptions = {
    from: "dummy@gmail.com",
    to: userEmail,
    subject: "Your Task Reminder",
    text: `Reminder: ${taskName}`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent!", info);
  } catch (error) {
    console.error(error);
  }
};
export default {
  sendAlert,
};
remiderTasks.start();
