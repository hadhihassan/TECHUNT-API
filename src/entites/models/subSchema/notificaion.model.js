import mongoose, { Schema } from 'mongoose';

        // interface Notification extends Document {
        //     recipient_id: Schema.Types.ObjectId;
        //     sender_id: Schema.Types.ObjectId;
        //     type: string;
        //     content: string;
        //     read: boolean;
        //     metaData?: any;
        //     timestamp: Date;
        // }

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
        type: Schema.Types.ObjectId,
    },

}, {
    timestamps: true
});

// Define the model
const NotificationModel = mongoose.model('Notification', notificationSchema);

export default NotificationModel;