import { JobPostUseCase } from "../../useCases/jobPost.UseCase.js";

export class JobPostController {
    constructor() {
        this.jobPostUseCase = new JobPostUseCase()
    }
    async createNewJobPost(req, res) {
        const data = req.body
        const id = req.clientId
        const result = await this.jobPostUseCase.postNewJob(data, id)
        return res.status(result.status).json(result)
    }
    async diplsyaAllJoboPost(req, res) {
        const id = req.clientId
        const result = await this.jobPostUseCase.getAllClientJobPosts(id)
        return res.status(result.status).json(result)
    }
    async editJoboPost(req, res) {
        const data = req.body.data
        const id = req.body.id
        const result = await this.jobPostUseCase.UpdateJobPost(data, id)
        return res.status(result.status).json(result)
    }
    async getJobPost(req, res) {
        const id = req.body.id
        const result = await this.jobPostUseCase.getAllClientJobPosts(id)
        return res.status(result.status).json(result)
    }
    async getAllJobPostForTalent(req, res) {
        const result = await this.jobPostUseCase.getFullJobsForTalent()
        return res.status(result.status).json(result)
    }
    async findJobPost(req, res) {
        const { searchData } = req.body
        const result = await this.jobPostUseCase.serachJobs(searchData);
        return res.status(result.status).json(result)
    }
}