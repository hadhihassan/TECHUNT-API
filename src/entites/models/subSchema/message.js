import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'senderModel'
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'receiverModel'
    },
    message: {
        type: String,
        required: true
    },
    read:{
        type : Boolean ,
        default: false
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
