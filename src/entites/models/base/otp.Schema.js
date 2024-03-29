import mongoose from 'mongoose'
import OTPGenerator from '../../../utils/otpGenerator.js';
import { OTP_LENGTH } from '../../../constants/constant.js';
const { Schema } = mongoose
const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otpValue: {
        type: String,
    },
    expiryTime: {
        type: Date,
        default: () => new Date(Date.now() + 120000)
    }
});
otpSchema.index({ expiryTime: 1 }, { expireAfterSeconds: 120 });
otpSchema.pre('save', function (next) {
    this.otpValue = OTPGenerator.generate(OTP_LENGTH);
    next();
});

const OTP = mongoose.model('OTP', otpSchema);


export default OTP;
