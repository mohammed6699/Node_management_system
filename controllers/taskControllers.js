
import { SUCCESS, ERROR } from '../utils/httpStatus';
import TaskModel, { find, findByIdAndUpdate, deleteOne } from '../models/taskModel';
// get all tasks
const getAllTAsk = async (req, res) => {
    const query = req.query;
    const limit = query.limit;
    const page = query.page;
    const end = (page - 1) * limit;
    const allTasks = await find().limit(limit).skip(end);
    res.status(201).json({status: SUCCESS, data: {allTasks}});
}

// add task
const addTask = async (req, res) => {
    const addTask = new TaskModel(req.body);
    await addTask.save();
    res.status(201).json({status: SUCCESS, data: {addTask}});
}
// update task 
const updateTask = async (req, res) => {
    try {
    const updateTask = await findByIdAndUpdate(req.params.taskid, {$set: {...req.body}});
    res.status(201).json({status: SUCCESS, data: {updateTask}})
    } catch (error) {
         res.status(400).json({status: ERROR, data: null, error: error.message})
    }
}
// delete
const deleteTask = async (req, res) => {
    const delTask = await deleteOne(req.params.taskid)
    res.status(201).json({status: SUCCESS, data: {title: 'Task Deleted'}})
}
export default {
    getAllTAsk,
    addTask,
    updateTask,
    deleteTask
}