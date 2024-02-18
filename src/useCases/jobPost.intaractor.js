import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { get500Response } from "../infrastructure/helperFunctions/response.js";
import { JobPostRepository } from "../infrastructure/database/jobPost.Database.js";


export class JobPostUseCase {
    constructor() {
        this.jobPostRepository = new JobPostRepository();
    }
    async postNewJob(data, id) {
        try {
            console.log(data, id)
            const postResult = await this.jobPostRepository.insertNewJobPost(data, id)
            if (postResult === null) {
                return {

                    status: STATUS_CODES.BAD_REQUEST,
                    message: "While creating new job post got a error.",
                    success: false
                }
            }
            return {
                status: STATUS_CODES.OK,
                message: "Successfully created new job post.",
                success: true
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async getAllClientJobPosts(id) {
        try {
            const datas = await this.jobPostRepository.getAllJobPosts(id)
            if (datas === null) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: "While fetching job post got a error.",
                    sucess: false,
                    
                }
            }
            return {
                status: STATUS_CODES.OK,
                message: "Successfully get all job post ",
                sucess: true,
                data:datas
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async UpdateJobPost(data,id) {
        try {
            const result = await this.jobPostRepository.updateJobDocument(data,id)
            console.log(result)
            if (result === null) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: "While updating job post got a error.",
                    sucess: false,
                    
                }
            }
            return {
                status: STATUS_CODES.OK,
                message: "Successfully updated job post ",
                sucess: true,
            }
        } catch (err) {
            get500Response(err)
        }
    }
} 