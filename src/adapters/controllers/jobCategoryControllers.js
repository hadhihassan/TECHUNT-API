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
    // async changeState(req,res){
    //     const result = await this
    // }
}