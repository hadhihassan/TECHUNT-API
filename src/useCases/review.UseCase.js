import { ReviewRepository } from "../infrastructure/repository/review.Database.js";
import { get200Response, get400Response, get500Response } from '../infrastructure/helperFunctions/response.js';

export class ReviewUseCase {
    constructor() {
        this.reviewRepository = new ReviewRepository()
    }
    async saveReview(data) {
        try {
            const result = await this.reviewRepository.saveReview(data)
            if(result){
                get200Response(result)
            }
            get400Response()
        } catch (err) {
            get500Response()
        }
    }
    async getReview(to) {
        try {
            const result = await this.reviewRepository.getReview(to)
            if(result){
                get200Response(result)
            }
            get400Response()
        } catch (err) {
            get500Response()
        }
    }
}