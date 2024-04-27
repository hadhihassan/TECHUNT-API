import mongoose from "mongoose";
const { Schema } = mongoose;
const JobCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100,
    },
    // image: {
    //     type: String, 
    //     required: true
    // },
    workingBelow: {
        type: Number, 
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const JobCategory = mongoose.model("Job_Category", JobCategorySchema); 
export default JobCategory;