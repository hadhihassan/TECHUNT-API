import mongoose from "mongoose"
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    // userId: {
    // 	type: Schema.Types.ObjectId,
    // 	required: true,
    // 	ref: "user",
    // 	unique: true,
    // },
    token: { type: String },
    createdAt: { type: Date, default: Date.now, expires: 60 },
});

export default mongoose.model("token", tokenSchema);