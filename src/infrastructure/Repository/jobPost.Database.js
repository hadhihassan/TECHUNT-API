import mongoose from 'mongoose';
import JobPostModel from '../../entites/models/jobPost.model.js'


export class JobPostRepository {
    async findByName(name) {
        return await JobPostModel.findOne({ name });
    }

    async insertNewJobPost(data, clientId) {
        data.Client_id = clientId;
        const newJobPost = new JobPostModel(data);
        return await newJobPost.save();
    }

    async getAllJobPosts(id) {
        return await JobPostModel.find({ Client_id: id });
    }

    async updateJobPost(id, data) {
        return await JobPostModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteJobPost(id) {
        return await JobPostModel.findByIdAndUpdate(id, { isDeleted: true });
    }

    async updateJobDocument(data,id) {
        return await JobPostModel.findByIdAndUpdate(id, data, { new: true });
    }
    
    async findAllPost(){
        return await JobPostModel.find().populate('Client_id').exec();
    }
}