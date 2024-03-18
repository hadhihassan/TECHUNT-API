import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { get500Response } from "../infrastructure/helperFunctions/response.js";
import { JobPostRepository } from "../infrastructure/Repository/jobPost.Database.js";

export class JobPostUseCase {
    constructor() {
        this.jobPostRepository = new JobPostRepository();
    }
    async postNewJob(data, id) {
        try {
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
            const datas = await this.jobPostRepository.getJobPosts(id)
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
                data: datas
            }
        } catch (err) {
            get500Response(err)
        }
    }
    async UpdateJobPost(data, id) {
        try {
            const result = await this.jobPostRepository.updateJobDocument(data, id)
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
    async getFullJobsForTalent() {
        try {
            const posts = await this.jobPostRepository.findAllPost()
            if (posts === null) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: "While fetch post got an error",
                    success: false,

                }
            } return {
                status: STATUS_CODES.OK,
                message: "Successfull",
                success: true,
                data: posts
            }
        } catch (error) {
            get500Response(error)
        }
    }
    async getJobPost(id) {
        try {
            const posts = await this.jobPostRepository.getJobPost(id)
            if (posts === null) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: "While fetch post got an error",
                    success: false,

                }
            } return {
                status: STATUS_CODES.OK,
                message: "Successfull",
                success: true,
                data: posts
            }
        } catch (error) {
            get500Response(error)
        }
    }
    async serachJobs(searchData) {
        try {
            const Title = searchData.query || "";
            const WorkType = searchData.postType || "";
            const Expertiselevel = searchData.experiance || "";
            const maxAmount = searchData.maxInputValue || Infinity;
            const minAmount = searchData.inputValue || 0;
            const posts = await this.jobPostRepository.serachJobs({ Title, WorkType, Expertiselevel, maxAmount, minAmount })

            if (posts === null) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: "While fetch post got an error",
                    success: false,
                }
            } return {
                status: STATUS_CODES.OK,
                message: "Successfull",
                success: true,
                data: posts
            }
        } catch (error) {
            get500Response(error)
        }
    }
} 