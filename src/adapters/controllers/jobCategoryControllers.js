import { JobCategoryUseCase } from "../../useCases/jobCategory.intaractor.js";

export class JobCategoryControllers {
    constructor() {
        this.jobCategoryUseCase = new JobCategoryUseCase()
    }
    async addNewJobCategory(req, res) {
        req.body.image = req.file?.filename
        const result = await this.jobCategoryUseCase.AddJobCategory(req.body)
        return res.status(result.status).json(result)
    }
    async getJobCategory(req, res) {
        const datas = await this.jobCategoryUseCase.getAllCategories()
        return res.status(datas.status).json(datas)
    }
    async changeState(req, res) {
        const { status, id } = req.body
        const result = await this.jobCategoryUseCase.softDelete(status, id)
        return res.status(result.status).json(result)
    }
    async editJobCategory(req, res) {
        const { data, id } = req.body
        const result = await this.jobCategoryUseCase.updatejobCategory(data, id);
        return res.status(result.status).json(result)
    }
}