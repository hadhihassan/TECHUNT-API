const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const milestoneSchema = new Schema({
    no: {
        type: number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startingDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    completed: {
        type: string,
        enum: ["Pending", "Progress", "Completed"],
        default: "Pending"
    }
});

const Milestone = mongoose.model('Milestone', milestoneSchema);
module.exports = Milestone;
