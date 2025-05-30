require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT;
const URL = process.env.MONGO_CONNECTION
const app = express();
const taskRouter = require('./rotes/taskRoutes')
const userrouter = require('./rotes/userRotes')
mongoose.connect(URL).then(() => {
    console.log("Data Base Connected")
})
app.use('/api/task', taskRouter)
// login & signUp & getall
app.use('/api/user', userrouter)
app.listen(port, () => {
    console.log(`App is listing on port ${port}`)
})