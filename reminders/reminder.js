// fiter un finished , pendding tasks
import taskModel from "../models/taskModel.js";
import { schedule } from "node-cron";
import taskModel from "../models/taskModel.js";
import userModels from "../models/userModels.js";
import express from "express";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., Gmail, Yahoo, Outlook, or use "host", "port", etc. for SMTP
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password-or-app-password",
  },
});

const sendAlert = () => {
  try {
    taskModel.find({ status: "pendding" }).then((data) => {
      data.forEach((task) => {
        const email = userModels.findById(task.userId).then((user) => {
          return user.email;
        });
        sendEmail(email, task.name);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
const remiderTasks = schedule("* * * * *", sendAlert);
const sendEmail = async (userEmail, taskName) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: userEmail,
    subject: "Your Task Reminder",
    text: `Reminder: ${taskName}`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent!", info });
  } catch (error) {
    console.error(error);
  }
};
// remiderTasks.start();
