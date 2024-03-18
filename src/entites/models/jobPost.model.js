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
        enum: ['Small', 'Medium', 'Large']
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

export async function searchJobs({ Title, WorkType, Expertiselevel, maxAmount, minAmount }) {
    try {
        const query = {};
        if (Title !=="") query.Title = { $regex: new RegExp(Title, 'i') };
        if (WorkType !=="") query.WorkType = WorkType;
        if (Expertiselevel !=="") query.Expertiselevel = Expertiselevel;
        if (maxAmount) query.Amount = { $lte: maxAmount };
        if (minAmount) query.Amount = { ...query.Amount, $gte: minAmount };
        const jobs = await JobPost.find(query);
        return jobs;
    } catch (error) {
        throw new Error('Error searching jobs: ' + error.message);
    }
}



export default JobPost;

