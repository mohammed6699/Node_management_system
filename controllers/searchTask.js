import { FAIL, SUCCESS, ERROR } from "../utils/http-status.js";
import taskModel from "../models/taskModel.js";
// search task by category
const getTaskbyCategory = async (req, res) => {
  const { category } = req.params;
  const getTask = await taskModel.findOne({ category });
  if (!getTask) {
    return res
      .status(404)
      .json({ status: FAIL, data: { title: "Can;t find this task" } });
  }
  res.status(202).json({ status: SUCCESS, data: { getTask } });
  if (error) {
    return res
      .status(500)
      .json({ status: ERROR, data: { thistl: error.message } });
  }
};
// search task title
const getTaskByTitle = async (req, res) => {
  console.log(req.params)
  const { title } = req.params;
  const getTask = await taskModel.findOne({ Title:title });
  if (!getTask) {
    return res
      .status(404)
      .json({ status: FAIL, data: { title: "This task Can't be found" } });
  }
  res.status(201).json({ status: SUCCESS, data: { getTask } });
  if (error) {
    return res
      .status(500)
      .json({ status: ERROR, data: { thistl: error.message } });
  }
};
// description
const getTaskByDescription = async (req, res) => {
  const { description } = req.params;
  const getTask = await taskModel.findOne({ description });
  if (!getTask) {
    return res
      .status(404)
      .json({ status: FAIL, data: { title: "This task Can't be found" } });
  }
  res.status(201).json({ status: SUCCESS, data: { getTask } });
  if (error) {
    return res
      .status(500)
      .json({ status: ERROR, data: { thistl: error.message } });
  }
};
export  {
  getTaskByDescription,
  getTaskByTitle,
  getTaskbyCategory,
};
