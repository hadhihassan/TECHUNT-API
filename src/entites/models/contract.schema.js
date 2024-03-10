import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const contractSchema = new Schema({
    talent: {
        type: Schema.Types.ObjectId,
        ref: "Talent",
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    work: {
        type: Schema.Types.ObjectId,
        ref: 'JobPost',
        required: true
    },
    terms: {
        type: String,
        required: true
    },
    duration: {
        type: [Date],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed', 'cancelled'],
        default: 'pending'
    },
    milestones: [{
        type: Schema.Types.ObjectId,
        ref: 'Milestone'
    }],
    paymentTerms: {
        type: String
    },
    notes: {
        type: String
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });
const Contract = mongoose.model('Contract', contractSchema);
export default Contract;