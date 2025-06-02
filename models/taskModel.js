import { Schema, model } from 'mongoose';
import { HIGH, MEDIUM, LOW } from '../utils/priority';
import { COMPLETED, INPROGRESS, PENDDING } from '../utils/progress';

const taskModel = new Schema({
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
        enum: [HIGH, MEDIUM, LOW],
        default: MEDIUM
    },
    progress: {
        type: String,
        enum: [COMPLETED, INPROGRESS, PENDDING],
        default: COMPLETED
    },
    category: {
        type:String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
export default model('Task', taskModel);