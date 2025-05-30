const HTTPSTATUS = require('../utils/httpStatus');
const TaskModel = require('../models/taskModel');
// search task by category
const getTaskbyCategory = async(req, res) => {
    const {category} = req.params;
    const getTask = await TaskModel.findOne({category});
    if(!getTask){
        return res.status(404).json({status: HTTPSTATUS.FAIL, data: {title: "Can;t find this task"}})
    }
    res.status(202).json({status: HTTPSTATUS.SUCCESS, data: {getTask}})
    if (error){
        return res.status(500).json({status: HTTPSTATUS.ERROR, data: {thistl: error.message}})
    }
}
// search task title
const getTaskByTitle = async (req, res) => {
    const {title} = req.params;
    const getTask = await TaskModel.findOne({title});
    if(!getTask){
       return res.status(404).json({status: HTTPSTATUS.FAIL, data: {title: "This task Can't be found"}})
    }
    res.status(201).json({status: HTTPSTATUS.SUCCESS, data:{getTask}})
    if(error){
        return res.status(500).json({status: HTTPSTATUS.ERROR, data: {thistl: error.message}})
    }
}
// description
const getTaskByDescription = async (req, res) => {
    const {description} = req.params
    const getTask = await TaskModel.findOne({description});
     if(!getTask){
        return res.status(404).json({status: HTTPSTATUS.FAIL, data: {title: "This task Can't be found"}})
    }
    res.status(201).json({status: HTTPSTATUS.SUCCESS, data:{getTask}})
    if(error){
       return res.status(500).json({status: HTTPSTATUS.ERROR, data: {thistl: error.message}})
    }
}
module.exports = {
    getTaskByDescription,
    getTaskByTitle,
    getTaskbyCategory
}