import { STATUS_CODES } from "../../constants/httpStatusCode.js"
import getProfileProggressBarPercentage from "../../infrastructure/helperFunctions/calculateProfileCompletion.js"
import { VerificationUseCase } from "../../useCases/verification.UseCase.js"

export class VerificationController {
    constructor() {
        this.verificationUseCase = new VerificationUseCase
    }
    async login(req, res) {
        try {
            const { email, password } = req.body
            const result = await this.verificationUseCase.verifyLogin(email, password)
            const progress = getProfileProggressBarPercentage(result.data, result.role)
            result.progress = progress;
            return res.status(result.status).json(result)
        } catch (error) {
            console.log(error.message)
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }
    async checkNumberisValid(req, res) {
        try {
            console.log(req.body)
            const { number, role, id } = req.body
            const valid = await this.verificationUseCase.checkValidity(number, role, id)
            return res.status(valid.status).json(valid)
        } catch (err) {
            console.log(err.message)
        }
    }
    async setNumberVerified(req, res) {
        const { id, role } = req.body
        const result = await this.verificationUseCase.updateNumberVerifiedStatus(id, role)
        return res.status(result.status).json(result)
    }
    async addBankDetails(req, res) {
        const { data, role, id } = req.body
        const result = await this.verificationUseCase.addBankDetails(id, role, data)
        return res.status(result.status).json(result)
    }
    async updateBankDetails(req, res) {
        const { data, role, id } = req.body;
        const result = await this.verificationUseCase.updateBankDetails(role, id, data)
        console.log(result)
        return res.status(result.status).json(result)
    }
    async forGetPasswordEmail(req, res) {
        const { email } = req.body
        const result = await this.verificationUseCase.forGetPassWordEmailCheck(email)
        return res.status(result.status).json(result)
    }
    async checkOtpIsValid(req, res) {
        const { email , otp} = req.body
        const result = await this.verificationUseCase.isOtpIsValid(email, otp)
        return res.status(result.status).json(result)
    }
    async updatedPassword(req, res) {
        const { email , password} = req.body
        const result = await this.verificationUseCase.setNewPassword(email , password)
        return res.status(result.status).json(result)
    }
}
