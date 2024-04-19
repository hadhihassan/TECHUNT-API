import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewModel = new Schema({
    to: {
        type: Schema.Types.ObjectId,
    },
    from: {
        type: Schema.Types.ObjectId,
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