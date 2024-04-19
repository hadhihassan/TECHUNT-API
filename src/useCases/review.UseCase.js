import { ReviewRepository } from "../infrastructure/repository/reviewDatabase.js";
import { get200Response, get400Response, get500Response } from '../infrastructure/helperFunctions/response.js';
import { ContractUseCase } from "./contract.UseCase.js";

export class ReviewUseCase {
    constructor() {
        this.reviewRepository = new ReviewRepository()
        this.contractUseCase = new ContractUseCase()
    }
    async saveReview(data, workId, role) {
        try {
            const result = await this.reviewRepository.saveReview(data)
            if (result) {
                const saveToContract = await this.contractUseCase.saveToContract(workId, result._id, role)
                console.log(saveToContract, " this is the saveToContract")
                if (saveToContract) {
                    return {
                        status: 200,
                        data: result,
                        success: true
                    }
                }
            }
            get400Response()
        } catch (err) {
            console.log(err.message)
            get500Response(err.message)
        }
    }
    async getReview(to) {
        try {
            const result = await this.reviewRepository.getReview(to)
            if (result) {
                return {
                    status: 200,
                    data: result,
                    success: true
                }
            }
            get400Response()
        } catch (err) {
            console.log(err)
            get500Response(err)
        }
    }
}