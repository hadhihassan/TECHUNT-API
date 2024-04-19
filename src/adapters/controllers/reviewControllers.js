import { ReviewUseCase } from "../../useCases/review.UseCase.js";
export class ReviewController {
    constructor() {
        this.reviewUseCase = new ReviewUseCase();
    }
    async saveNewReview(req, res) {
        const { data, workId, role } = req.body;
        console.log(req.body)
        const result = await this.reviewUseCase.saveReview(data, workId, role);
        return res.status(result.status).json(result)
    }
    async getReviews(req, res) {
        const { id } = req.params;
        const result = await this.reviewUseCase.getReview(id);
        return res.status(result.status).json(result);
    }
} 
