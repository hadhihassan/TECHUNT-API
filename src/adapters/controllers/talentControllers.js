import { STATUS_CODES } from "../../constants/httpStatusCode.js";
import { Encrypt } from "../../providers/bcryptPassword.js";
import { TalentUseCase } from "../../useCases/talent.intractor.js";


export class TalentController {
    constructor(talentUseCase, encrypt) {
        this.talentUseCase = new TalentUseCase();
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
            const setEmailVerify =  await this.talentUseCase.UpdateEmailVerify(req.clientId)
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
            return res.status(STATUS_CODES.CREATED).json({status:true,message:"Successfully changed profile photo"})
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
        const editResult = await this.talentUseCase.editProfileSectionOne(req.body,id)
        return res.status(editResult.status).json(editResult.data)
    }
    async updateSkills(req,res) {
        const id = req.clientId;
        const editResult = await this.talentUseCase.editSkills(req.body, id);
        return res.status(editResult.status).json(editResult.data)
    }
    async updateExperiance(req,res) {
        const id = req.clientId;
        const editResult = await this.talentUseCase.editExperiance(req.body, id);
        return res.status(editResult.status).json(editResult.data)
    }
    async updateConatctDeatils(req,res) {
        const id = req.clientId;
        const editResult = await this.talentUseCase.editConatctDeatils(req.body, id);
        return res.status(editResult.status).json(editResult.data)
    }
    async getAllTalents(req,res) {
        const result = await this.talentUseCase.getAllTalent();
        console.log(result)
        return res.status(STATUS_CODES.OK).json(result)
    }
}