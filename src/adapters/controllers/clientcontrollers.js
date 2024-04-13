import { STATUS_CODES } from '../../constants/httpStatusCode.js';
import { ClientUseCase } from '../../useCases/client.UseCase.js';
import { Encrypt } from '../../providers/bcryptPassword.js';
import { JobPostUseCase } from '../../useCases/jobPost.UseCase.js';
import { TalentUseCase } from '../../useCases/talent.UseCase.js';

export class ClientController {
    constructor(clientUseCase, encrypt) {
        this.clientUseCase = new ClientUseCase();
        this.talentUseCase = new TalentUseCase();
        this.jobPostUseCase = new JobPostUseCase();
        this.encrypt = new Encrypt()
    }
    async verifyEmail(req, res) {
        try {
            const { type } = req.body
            const { email } = req.body
            const { password } = req.body
            const isExist = await this.clientUseCase.isEmailExist(email);
            if (!isExist.status) {
                const securePassword = await this.encrypt.encryptPassword(password)
                await this.clientUseCase.sendTimeoutLinkEmailVerification(email);
                const saved = await this.clientUseCase.saveSignupData(email, securePassword)
                return res.status(STATUS_CODES.OK).json(saved)
            } else {
                return res.status(STATUS_CODES.CONFLICT).json({ message: "Email already existing" })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    async verifyEmailToken(req, res) {
        try {
            const { token } = req.params;
            const isExist = await this.clientUseCase.isTokenExist(token);
            if (!isExist) {
                return res.status(STATUS_CODES.FORBIDDEN).json({ status: false });
            }
            const updateAsVerified = await this.clientUseCase.UpdateEmailVerify(req.clientId)
            return res.status(STATUS_CODES.CREATED).json({ status: true, message: "Token exists successfully." });
        } catch (error) {
            console.log(error.message);
        }
    }
    async addConatcDetails(req, res) {
        try {
            const formData = req.body
            const response = await this.clientUseCase.saveConatctDeatils(formData, req.clientId)
            if (response) {
                return res.status(STATUS_CODES.CREATED).json({ status: true, message: "Contact details saved" })
            }
        } catch (error) {
            console.log(error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
        }
    }
    async uploadProfileImg(req, res) {
        try {
            const fileName = req.file?.filename
            const id = req.clientId
            await this.clientUseCase.saveProfilePic(fileName, id)
            return res.status(STATUS_CODES.CREATED)
        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
        }
    }
    async getClientProfile(req, res) {
        const id = req.clientId
        const result = await this.clientUseCase.getProfilelData(id)
        if (result === null) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ status: false, message: "Can't fetch the profile data.. " })
        } else {
            return res.status(STATUS_CODES.OK).json(result)
        }
    }
    async editProfile(req, res) {
        const id = req.clientId
        const editResult = await this.clientUseCase.editProfileSectionOne(req.body, id)
        return res.status(editResult.status).json(editResult.data)
    }
    async updateConatctDeatils(req, res) {
        const id = req.clientId;
        const editResult = await this.clientUseCase.editConatctDeatils(req.body, id);
        return res.status(editResult.status).json(editResult.data)
    }
    async getTransactionHistory(req, res) {
        const { clientId: id } = req;
        const getResult = await this.clientUseCase.getTransactionHistory(id)
        return res.status(getResult.status).json(getResult)
    }
    async senInvitation(req, res) {
        try {
            const { WorkId, talentId } = req.body
            console.log(req.body," the body")
            const getSender = await this.clientUseCase.getProfilelData(req.clientId)
            const getReceiver = await this.talentUseCase.getProfilelData(talentId)
            console.log(getSender, getReceiver, WorkId[0])
            const result = await this.clientUseCase.sendInvitation(getSender, getReceiver, WorkId[0])
            return res.status(result.status).json(result)
        } catch (err) {
            console.log(err)
        }
    }
    async getWalletAmount(req, res) {
        const getResult = await this.clientUseCase.getWalletAmount(req.clientId)
        return res.status(getResult.status).json(getResult);
    }
} 