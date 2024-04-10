import { ReviewUseCase } from "../../useCases/review.UseCase.js";
export class ReviewController {
    constructor() {
        this.reviewUseCase = new ReviewUseCase();
    }
    async saveNewReview(req, res) {
        const { data } = req.body;
        const result = this.reviewUseCase.saveReview(data);
        return res.status(result.status).json(result)
    }
    async getReviews(req, res) {
        const { clientId } = req;
        const result = await this.reviewUseCase.getReview(clientId);
        return res.status(result.status).json(result);
    }
} 
