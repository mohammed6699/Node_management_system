import { FAIL, SUCCESS, ERROR } from '../utils/httpStatus';
import { findOne } from '../models/taskModel';
// search task by category
const getTaskbyCategory = async(req, res) => {
    const {category} = req.params;
    const getTask = await findOne({category});
    if(!getTask){
        return res.status(404).json({status: FAIL, data: {title: "Can;t find this task"}})
    }
    res.status(202).json({status: SUCCESS, data: {getTask}})
    if (error){
        return res.status(500).json({status: ERROR, data: {thistl: error.message}})
    }
}
// search task title
const getTaskByTitle = async (req, res) => {
    const {title} = req.params;
    const getTask = await findOne({title});
    if(!getTask){
       return res.status(404).json({status: FAIL, data: {title: "This task Can't be found"}})
    }
    res.status(201).json({status: SUCCESS, data:{getTask}})
    if(error){
        return res.status(500).json({status: ERROR, data: {thistl: error.message}})
    }
}
// description
const getTaskByDescription = async (req, res) => {
    const {description} = req.params
    const getTask = await findOne({description});
     if(!getTask){
        return res.status(404).json({status: FAIL, data: {title: "This task Can't be found"}})
    }
    res.status(201).json({status: SUCCESS, data:{getTask}})
    if(error){
       return res.status(500).json({status: ERROR, data: {thistl: error.message}})
    }
}
export default {
    getTaskByDescription,
    getTaskByTitle,
    getTaskbyCategory
}