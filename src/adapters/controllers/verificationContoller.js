import { STATUS_CODES } from "../../constants/httpStatusCode.js"
import { VerificationUseCase } from "../../useCases/verification.intaractor.js"

export class VerificationController {
    constructor() {
        this.verificationUseCase = new VerificationUseCase
    }
    async TalentLogin(req, res) {
        try {
            const { email, password } = req.body
            const result = await this.verificationUseCase.verifyLogin(email, password)
            console.log(result);
            return res.status(result.status).json(result)
        } catch (error) {
            console.log(error.message)
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }
}