class OTPGenerator {
    static generate(otpLength) {
        let otp = '';
        for (let i = 0; i < otpLength; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    }
}
export default OTPGenerator;