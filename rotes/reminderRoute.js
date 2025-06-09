import reminder from '../reminders/reminder.js';
import express from "express";
const router = express.Router()

router.get('/reminder', async (req, res) => {
    try {
        await reminder.sendAlert()
        res.status(201).json({message: 'Reminder email sent'})
    } catch (error) {
        console.log(errro)
        res.status(500).json({message: 'Fail to send teh reminder'})
    }
})
export default router;