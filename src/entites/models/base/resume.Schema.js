import mongoose from "mongoose";
const { Schema } = mongoose;

export const ResumeSchema = new Schema({
    resume: {
        type: String
    }
})
