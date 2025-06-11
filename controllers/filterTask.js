import { ERROR, SUCCESS } from "../utils/http-status.js";
import taskModel from "../models/taskModel.js";

const getFilterTask = async (req, res) => {
  
  const query = req.query;
  const periority = query.periority;
  const category = query.category;
  if (!periority && !category) {
    res
      .status(500)
      .json({ status: ERROR, data: { title: "Set Filter method" } });
  }
  try {
   const filter = {};
    if (periority) filter.periority = periority;
    if (category) filter.category = category;

    // Execute the Mongoose find query
    const tasks = await taskModel.find(filter);
    res.status(201).json({ status: SUCCESS, data: { tasks } });
  } catch (error) {
    console.log("error", error)
    res.status(402).json({ status: ERROR, data: null, error: error.masssage });
    
  }
};
export default getFilterTask;
//   const resPriority = TaskModel.findOne(priority)
//   const resCategory = TaskModel.findOne(category)
//  const resStatus = TaskModel.findOne(status)
//  res.status(201).json({status: HTTPSTATUS.SUCCESS, data: {resPriority}})
//  res.status(201).json({status: HTTPSTATUS.SUCCESS, data: {resCategory}})
//  res.status(201).json({status: HTTPSTATUS.SUCCESS, data: {resStatus}})
