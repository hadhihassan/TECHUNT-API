import mongoose from 'mongoose';

const { Schema } = mongoose;

const proposalSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
    },
    coverLetter: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1000,
    },
    rate: {
        type: Number,
        default: 0,
        min: 0,
    },
    availability: {
        type: Date,
        required: true,
    },
    attachments: {
        type: String,
        trim: true,
        maxlength: 255,
    },
    additionalInfo: {
        type: String,
        trim: true,
        maxlength: 1000,
    },
    isAccept: {
        type: Boolean,
    },
    talentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Talent',
    },
    jobId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'JobPost',
    },
    Client_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Client',
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Failed ', 'Completed'],
        default : 'Pending'
    }
}, { timestamps: true });

const Proposal = mongoose.model('Proposal', proposalSchema);

export default Proposal;