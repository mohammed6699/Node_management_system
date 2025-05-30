require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT;
const URL = process.env.MONGO_CONNECTION
const app = express();
const taskRouter = require('./rotes/taskRoutes')
const userrouter = require('./rotes/userRotes')
const serchTAsk = require('./controllers/searchTask')
const filterTask = require('./controllers/filterTask')
mongoose.connect(URL).then(() => {
    console.log("Data Base Connected")
})
app.use('/api/task', taskRouter)
app.use('/api/task/search', serchTAsk)
app.use('/api/task', filterTask)
// login & signUp & getall
app.use('/api/user', userrouter)
app.listen(port, () => {
    console.log(`App is listing on port ${port}`)
})