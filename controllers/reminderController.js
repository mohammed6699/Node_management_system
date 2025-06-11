import  reminder from '../reminders/reminder.js';

export const sendReminder = async(req, res) => {
    try {
        const emailSent = await reminder.sendAlert()
        if(emailSent.length === 0){
            return res.status(200).json({message: "No pendding tasks"})
        }
        res.status(201).json({message: "reminder search finished", result: emailSent})
    } catch (error) {
        res.status(500).json({error:error})
        next(error)
    }
}