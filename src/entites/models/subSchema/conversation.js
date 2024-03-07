import mongoose from "mongoose";

const { Schema } = mongoose;

const conversationSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            red: "Message",
            default:[]
        },
    ],
}, { timestamps: true })

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation 