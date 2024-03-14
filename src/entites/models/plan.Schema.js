import mongoose from "mongoose"
const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    // type: {
    //     type: String,
    //     required: true
    // },
    amount: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });
const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;