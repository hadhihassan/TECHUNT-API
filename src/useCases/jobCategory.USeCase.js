import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { JobCategoryRepository } from "../infrastructure/repository/jobCategoryDatabase.js";
import { get500Response } from "../infrastructure/helperFunctions/response.js";

export class JobCategoryUseCase {
    constructor() {
        this.jobCategoryRepository = new JobCategoryRepository()
    }
    async AddJobCategory(data) {
        try {
            const isExist = await this.jobCategoryRepository.findByName(data.name)
            if (isExist) {
                return {
                    status: STATUS_CODES.OK,
                    success: false,
                    message: "The job category already exisiting."
                }
            }
            const result = await this.jobCategoryRepository.addNewJobCategory(data)
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
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: "success",
                    data: result
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
    async softDelete(status, id) {
        try {
            const result = await this.jobCategoryRepository.changeStatus(status, id);
            if (result.isModified) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: "Successfully changed status",
                    data: result
                };
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
                message: "No modification detected",
                data: result
            };
        } catch (error) {
            return get500Response(error);
        }
    }
    async updatejobCategory(data, id) {
        try {
            const isExisting = await this.jobCategoryRepository.findByName(data.name,id)
            if (isExisting) {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: "The job category name already existing",
                    success: false
                }
            }
            const result = await this.jobCategoryRepository.update(data, id)
            if (result.isModified) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    message: "Succeddfully updated",
                }
            } return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
                message: "No modification detected",
            };
        } catch (error) {
            console.log(error.message)
            return get500Response(error);
        }
    }
}