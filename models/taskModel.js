import { Schema, model } from "mongoose";
import Periority from "../utils/priority.js";
import progress from "../utils/progress.js";
import mongoose from "mongoose";
const taskModel = new Schema({
  Title: {
    type: String,
    reuired: true,
  },
  Description: {
    type: String,
  },
  Due_Date: {
    type: Date,
    required: true,
  },
  periority: {
    type: String,
    enum: [Periority.HIGH, Periority.MEDIUM, Periority.LOW],
    default: Periority.MEDIUM,
  },
  progress: {
    type: String,
    enum: [progress.COMPLETED, progress.INPROGRESS, progress.PENDDING],
    default: progress.INPROGRESS,
  },
  category: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  },
});
export default model("Task", taskModel);
