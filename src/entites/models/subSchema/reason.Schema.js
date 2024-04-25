import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReasonSchema = new Schema({
    newDeadline: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    accept: {
        type: Boolean,
        default: false
    }
})
const Reason = mongoose.model("Reason", ReasonSchema);
export default Reason;