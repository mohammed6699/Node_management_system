// fiter un finished , pendding tasks
import taskModel from '../models/taskModel.js'
import { schedule } from 'node-cron'
const remiderTasks = schedule("0 9 * * *", async() => {
    
})