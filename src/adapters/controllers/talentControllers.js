import { STATUS_CODES } from "../../constants/httpStatusCode.js";
import { Encrypt } from "../../providers/bcryptPassword.js";
import { TalentUseCase } from "../../useCases/talent.UseCase.js";
import { ClientUseCase } from "../../useCases/client.UseCase.js";
import { JobPostUseCase } from "../../useCases/jobPost.UseCase.js";
import { EducationUseCase } from "../../useCases/education.UseCase.js";
import talent from "../../entites/models/talen.model.js";

export class TalentController {
    constructor() {
        this.talentUseCase = new TalentUseCase();
        this.clientUseCase = new ClientUseCase();
        this.jobPostUseCase = new JobPostUseCase();
        this.educationUseCase = new EducationUseCase();
        this.encrypt = new Encrypt()
    }
    async verifyEmail(req, res) {
        try {
            const { email, type } = req.body
            const { password } = req.body
            const isExist = await this.talentUseCase.isEmailExist(email);
            if (!isExist.status) {
                const securePassword = await this.encrypt.encryptPassword(password)
                await this.talentUseCase.sendTimeoutLinkEmailVerification(email);
                const saved = await this.talentUseCase.saveSignupData(email, securePassword)
                return res.status(STATUS_CODES.OK).json(saved)
            }
            return res.status(STATUS_CODES.CONFLICT).json({ message: "Email already exsting" })
        } catch (error) {
            console.log(error.message);
        }
    }
    async verifyEmailToken(req, res) {
        try {
            const { token } = req.params;
            const isExist = await this.talentUseCase.isTokenExist(token);
            if (!isExist) {
                return res.status(403).json({ status: false });
            }
            const setEmailVerify = await this.talentUseCase.UpdateEmailVerify(req.clientId)
            return res.status(201).json({ status: true, message: "Token exists successfully." });
        } catch (error) {
            console.log(error.message);
        }
    }
    async addConatcDetails(req, res) {
        try {
            const formData = req.body
            const response = await this.talentUseCase.saveConatctDeatils(formData, req.clientId)
            if (response) {
                return res.status(STATUS_CODES.CREATED).json({ status: true, message: "Contact deatisl saved" })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    async uploadProfileImg(req, res) {
        try {
            const fileName = req.file?.filename
            const id = req.clientId
            await this.talentUseCase.saveProfilePic(fileName, id)
            return res.status(STATUS_CODES.CREATED).json({ status: true, message: "Successfully changed profile photo" })
        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
        }
    }
    async saveJobBasedData(req, res) {
        const id = req.clientId
        const result = await this.talentUseCase.saveJobData(req.body, id)
        return res.status(STATUS_CODES.OK).json(result)
    }
    async getTalentProfile(req, res) {
        const id = req.clientId
        const result = await this.talentUseCase.getProfilelData(id)
        if (result === null) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ status: false, message: "Can't fetch the profile data.. " })
        } else {
            return res.status(STATUS_CODES.OK).json(result)
        }
    }
    async editProfileFirstSection(req, res) {
        const id = req.clientId
        const editResult = await this.talentUseCase.editProfileSectionOne(req.body, id)
        return res.status(editResult.status).json(editResult.data)
    }
    async updateSkills(req, res) {
        const id = req.clientId;
        const editResult = await this.talentUseCase.editSkills(req.body, id);
        return res.status(editResult.status).json(editResult.data)
    }
    async updateExperiance(req, res) {
        const id = req.clientId;
        const editResult = await this.talentUseCase.editExperiance(req.body, id);
        return res.status(editResult.status).json(editResult.data)
    }
    async updateConatctDeatils(req, res) {
        const id = req.clientId;
        const editResult = await this.talentUseCase.editConatctDeatils(req.body, id);
        return res.status(editResult.status).json(editResult.data)
    }
    async getAllTalents(req, res) {
        const result = await this.talentUseCase.getAllTalent();
        return res.status(STATUS_CODES.OK).json(result)
    }
    async getAllClientsForTalent(req, res) {
        const result = await this.clientUseCase.getAllClient()
        return res.status(STATUS_CODES.OK).json(result);
    }
    async getClientProposals(req, res) {
        const client_id = req.params.id
        const proposals = await this.jobPostUseCase.getAllClientJobPosts(client_id)
        return res.status(proposals.status).json(proposals.data)
    }
    async getTalentTransactionHistory(req, res) {
        const { clientId: id } = req;
        const getResult = await this.talentUseCase.getTransactionsHistory(id)
        return res.status(getResult.status).json(getResult)
    }
    async getWalletAmount(req, res) {
        const getResult = await this.talentUseCase.getWalletAmount(req.clientId)
        return res.status(getResult.status).json(getResult);
    }
    async saveTalentResume(req, res) {
        const { s3Link } = req.body;
        const id = req.clientId
        const result = await this.talentUseCase.saveResume(id, s3Link);
        return res.status(result.status).json(result);
    }
    async saveEduction(req, res) {
        const { data, } = req.body;
        const { clientId: id } = req;
        const result = await this.talentUseCase.saveEducation(data, id);
        return res.status(result.status).json(result);
    }
    async deleteEducation(req, res) {
        const { id } = req.params;
        const { clientId: talentId } = req;
        await this.educationUseCase.deleteEducation(id)
        const result = await this.talentUseCase.deleteEducation(id, talentId)
        return res.status(result.status).json(result);
    }
    async editEducation(req, res) {
        console.log("request is here", req.body)
        const { id, data } = req.body;
        const editData = await this.educationUseCase.editEducation(id, data)
        return res.status(editData.status).json(editData);
    }
    async getDataForTalent(req, res) {
        const { id } = req.params
        const talentData =  await talent.findById(id).populate(["subscription", "bankDetails", "Wallet", "educations"])
        return res.status(200).json(talentData)
    }
}