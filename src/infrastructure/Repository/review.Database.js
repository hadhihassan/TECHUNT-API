import Review from '../../entites/models/subSchema/review.schema.js'
export class ReviewRepository {
    async saveReview(data) {
        return await Review.create(data)
    }
    async getReview(to) {
        return await Review.find({ to: to });
    }
}