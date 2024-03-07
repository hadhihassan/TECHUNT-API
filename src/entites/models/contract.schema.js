const mongoose = require('mongoose');
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
    project: {
        type: Schema.Types.ObjectId,
        ref: 'JobPost', 
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
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        dueDate: {
            type: Date,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }],
    paymentTerms: {
        type: String
    },
    notes: {
        type: String
    }
});
const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;