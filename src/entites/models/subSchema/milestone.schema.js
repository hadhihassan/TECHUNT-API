import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const milestoneSchema = new Schema({
    no: {
        type: Number,
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
        type: String,
        enum: ["Pending", "Progress", "Completed"],
        default: "Pending"
    },
    approval: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
        required: true
    },
    payed: {
        type: Boolean,
        default: false
    },
    work:{
        type : Schema.Types.ObjectId,
        ref: 'Work'
    },
    payment:{
        type: String,
        enum: ["Pending", "failed", "Completed"],
        default: "Pending"
    }
}, { timestamps: true });

const Milestone = mongoose.model('Milestone', milestoneSchema);
export default Milestone
