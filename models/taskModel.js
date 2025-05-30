const mongoose = require('mongoose');
const Periority = require('../utils/priority');
const progress = require('../utils/progress');

const taskModel = new mongoose.Schema({
    Title:{
        type: String,
        reuired: true,
    },
    Description: {
        type: String,
    },
    Due_Date:{
        type: Date,
        required: true
    },
    periority: {
        type: String,
        enum: [Periority.HIGH, Periority.MEDIUM, Periority.LOW],
        default: Periority.MEDIUM
    },
    progress: {
        type: String,
        enum: [progress.COMPLETED, progress.INPROGRESS, progress.PENDDING],
        default: progress.COMPLETED
    },
    category: {
        type:String
    }
});
module.exports = mongoose.model('Task', taskModel);