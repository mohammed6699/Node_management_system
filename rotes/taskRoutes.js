const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const taskContollers = require('../controllers/taskControllers')
const filterTask = require('../controllers/filterTask')

router.route('/')
            .get(taskContollers.getAllTAsk)
            .post(verifyToken,taskContollers.addTask)
router.route('/:taskid')
            .patch(taskContollers.updateTask)
            .delete(taskContollers.deleteTask)
router.route('/title/:title')
            .get(taskContollers.getTaskByTitle)
router.route('/category/:category')
            .get(taskContollers.getTaskbyCategory)
router.route('/description/:description')
            .get(taskContollers.getTaskByDescription)
router.route('/:filter')
            .get(filterTask.getFilterTask)
module.exports = router;