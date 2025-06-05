import { ERROR, SUCCESS } from "../utils/http-status.js";
import TaskModel from "../models/taskModel.js";
import taskModel from "../models/taskModel.js";
// get all tasks
const getAllTAsk = async (req, res) => {
  const query = req.query;
  const limit = query.limit;
  const page = query.page;
  const end = (page - 1) * limit;
  const allTasks = await TaskModel.find().limit(limit).skip(end);
  res.status(201).json({ status: SUCCESS, data: { allTasks } });
};

// add task
const addTask = async (req, res) => {
  try {
    const { Title, Description, Due_Date, user, category } = req.body;

    // 1. Create the new task
    const newTask = new TaskModel({
      Title,
      Description,
      Due_Date,
      user,
      category,
    });
    await taskModel.create(newTask);

    // 2. Push task ID into user's tasks array
    const updatedUser = await UserModel.findByIdAndUpdate(
      user,
      { $push: { tasks: newTask._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: ERROR, message: "User not found" });
    }

    res.status(201).json({ status: SUCCESS, data: { newTask } });
  } catch (error) {
    res.status(500).json({
      status: ERROR,
      message: "Failed to add task and assign to user",
      error,
    });
  }
};
// update task
const updateTask = async (req, res) => {
  try {
    const updateTask = await TaskModel.findByIdAndUpdate(req.params.taskid, {
      $set: { ...req.body },
    });
    res.status(201).json({ status: SUCCESS, data: { updateTask } });
  } catch (error) {
    res.status(400).json({ status: ERROR, data: null, error: error.message });
  }
};
// delete
const deleteTask = async (req, res) => {
  const delTask = await TaskModel.deleteOne(req.params.taskid);
  res.status(201).json({ status: SUCCESS, data: { title: "Task Deleted" } });
};
export { deleteTask, updateTask, addTask, getAllTAsk };
