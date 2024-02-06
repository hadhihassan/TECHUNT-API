import { STATUS_CODES } from "../../constants/httpStatusCode.js";
import { Encrypth } from "../../providers/bcryptPassword.js";
import { TalentUseCase } from "../../useCases/talent.intractor.js";


export class TalentController {
    constructor(talentUseCase, encrypt) {
        this.talentUseCase = new TalentUseCase();
        this.encrypt = new Encrypth()

    }

    async verifyEmail(req, res) {
        try {
            const { email, type } = req.body
            const { password } = req.body
            console.log(req.body);
            const isExist = await this.talentUseCase.isEmailExist(email);
            if (!isExist.status) {
                const securePassword = await this.encrypt.encrypthPassword(password)
                console.log(securePassword, "the password")
                await this.talentUseCase.sendTimeoutLinkEmailVerification(email);
                const saved = await this.talentUseCase.saveSignupData(email, securePassword)
                console.log(saved, "orginal data")
                return res.status(201).json(saved)
            }
            return res.status(403).json({ message: "email Alredy exsting" })
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
            return res.status(201).json({ status: true, message: "Token exists successfully." });
        } catch (error) {
            console.log(error.message);
        }
    }

    async addConatcDetails(req, res) {
        try {
            const formData = req.body
            console.log(formData, req.session.id);
            const response = await this.talentUseCase.saveConatctDeatils(formData, req.session.clientId)
            if (response) {
                return res.status(STATUS_CODES.CREATED).json({ status: true, message: "Conatct deatisl saved" })
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async uploadProfileImg(req, res) {
        try {
            console.log(req.body, req.session.userId)
        } catch (error) {
            console.log(error.message)
        }
    }

    async uploadProfileImg(req, res) {
        try {
            const fileName = req.file?.filename
            const id = req.session.clientId
            await this.talentUseCase.saveProfilePic(fileName, id)
            return res.status(STATUS_CODES.CREATED)
        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
        }
    }
    async TalentLogin(req, res) {
        try {
            const { email, password } = req.body
            const result = await this.talentUseCase.verifyLogin(email, password)
            return res.status(result.status).json(result)
        } catch (error) {
            console.log(error.message)
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }

    async saveJobBasedData(req, res) {
        const id = req.session.clientId
        const result = await this.talentUseCase.saveJobData(req.body, id)
        console.log(id,result)
        return res.status(STATUS_CODES.OK).json(result)
    }

    async getTalentProfile(req, res) {
        const id = req.session.clientId
        const result = await this.talentUseCase.getProfilelData(id)
        if (result === null) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ status: false, message: "Can't fetch the profile data.. " })
        } else {
            return res.status(STATUS_CODES.OK).json(result)
        }

    }

}