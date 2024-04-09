import mongoose from "mongoose";

const { Schema } = mongoose;

const EducationModel = new Schema({
    institution: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true
    },
    fieldOfStudy: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        default: "Present"
    }
}, {
    timestamps: true
})

const Education = mongoose.model("Education", EducationModel);
export default Education