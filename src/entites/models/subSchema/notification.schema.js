import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema({
    recipient_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    sender_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    metaData: {
        type: String,
    },

}, {
    timestamps: true
});
const NotificationModel = mongoose.model('Notification', notificationSchema);

export default NotificationModel;