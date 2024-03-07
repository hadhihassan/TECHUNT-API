const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractSchema = new Schema({
    freelancer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    terms: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
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
    createdAt: {
        type: Date,
        default: Date.now
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
    }
});

// Create Contract model
const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
