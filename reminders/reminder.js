// fiter un finished , pendding tasks
import taskModel from '../models/taskModel'
import { schedule } from 'node-cron'
const remiderTasks = schedule("0 9 * * *", async() => {
    
})