import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { JobCategoryRepository } from "../infrastructure/database/jobCategory.Database.js";
import { get500Response } from "../infrastructure/helperFunctions/response.js";

export class JobCategoryUseCase {
    constructor() {
        this.jobCategoryRepository = new JobCategoryRepository()
    }
    async AddJobCategory(data) {
        try {
            console.log(data)
            console.log(data.name)
            const isExist = await this.jobCategoryRepository.findByName(data.name)
            if (isExist) {
                return {
                    status: STATUS_CODES.OK,
                    success: false,
                    message: "The job category already exisiting."
                }
            }
            const result = await this.jobCategoryRepository.addNewJobCategory(data)
            console.log(result)
            return {
                status: STATUS_CODES.CREATED,
                success: true,
                message: "New job Category added successfull"
            }
        } catch (error) {
            return get500Response(error)
        }
    }
    async getAllCategories() {
        try {
            const result = await this.jobCategoryRepository.getAllCategory()
            console.log(result)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: "success",
                    data:result
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
                message: "Failed to get job categories"
            }
        } catch (error) {
            return get500Response(error)
        }
    }
}