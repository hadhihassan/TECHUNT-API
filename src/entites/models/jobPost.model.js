import mongoose  from 'mongoose';

const { Schema, ObjectId } = mongoose;

const JobPostSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Client_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Client',
    },
    Skills: [{
        type: String,
        required: true,
    }],
    TimeLine: {
        type: String,
        enum: ['Small', 'Medium ', 'Large']
    },
    Description: {
        type: String,
        required: true
    },
    Expertiselevel: {
        type: String,
        enum: ['Fresher', 'Medium', 'Experianced']
    },
    Amount: {
        type: Number,
        required: true
    },
    WorkType: {
        type: String,
        required: true,
        enum: ['Fixed', 'Milestone']
    },
    isDelete: {
        type: Boolean,
        default : false
    }
}, {
    timestamps: true
});

const JobPost = mongoose.model('JobPost', JobPostSchema);

export default JobPost;

