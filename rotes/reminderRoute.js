import { sendReminder } from '../controllers/reminderController.js'
import express from "express";
// import { ERROR } from '../utils/http-status.js.js'
const router = express.Router()

router.get('/reminder', sendReminder)
export default router;