import mongoose from "mongoose"

const SubscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
