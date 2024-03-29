import OTP from '../../entites/models/base/otp.Schema.js';

export class OtpRepository {
    async createNewOtp(email) {
        return await OTP.create({ email: email });
    }
    async checkOtpIsVaid(email,otp) {
        return await OTP.findOne({ email: email , otpValue : otp});
    }
}