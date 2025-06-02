import { ERROR, SUCCESS } from '../utils/httpStatus';
import { find } from '../models/taskModel';

const getFilterTask = async(req, res) => {
    const query = req.query;
    const priority = query.priority;
    const category = query.category;
    const status = query.status;
    if(!priority && !category && !status){
        res.status(500).json({status: ERROR, data: {title: "Set Filter method"}})
    }
    try {
        const filter = {}
        if (priority) filter.priority = priority;
        if (category) filter.category = category;
        if (status) filter.status = status;
        const task = await find({filter});
        res.status(201).json({status: SUCCESS, data: {task}}) 
    } catch (error) {
        res.status(402).json({status:ERROR, data: null, error: error.masssage})    
    }
}
export default {
    getFilterTask
}
    //   const resPriority = TaskModel.findOne(priority)
    //   const resCategory = TaskModel.findOne(category)
    //  const resStatus = TaskModel.findOne(status)
    //  res.status(201).json({status: HTTPSTATUS.SUCCESS, data: {resPriority}})
    //  res.status(201).json({status: HTTPSTATUS.SUCCESS, data: {resCategory}})
    //  res.status(201).json({status: HTTPSTATUS.SUCCESS, data: {resStatus}})