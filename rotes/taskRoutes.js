const express = require('express');
const router = express.Router();
const taskContollers = require('../controllers/taskControllers')

router.route('/')
            .get(taskContollers.getAllTAsk)
            .post(taskContollers.addTask)
router.route('/:taskid')
            .patch(taskContollers.updateTask)
            .delete(taskContollers.deleteTask)
module.exports = router;