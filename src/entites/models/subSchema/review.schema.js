import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewModel = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Review = mongoose.model("Review", ReviewModel);
export default Review;