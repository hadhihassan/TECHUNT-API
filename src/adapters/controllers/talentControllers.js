import { TalentUseCase } from "../../useCases/talent.intractor.js";


export class TalentController {
    constructor(talentUseCase) {
        this.talentUseCase = new TalentUseCase();
    }

    async verifyEmail(req, res) {
        try {
            console.log(req.body)
            const { email, type } = req.body
            const isExist = await this.talentUseCase.isEmailExist(email);
            if (!isExist) {
                let sended = await this.talentUseCase.sendTimeoutLinkEmailVerification(email);
                    const saved = await this.talentUseCase.saveEmail(email)
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

            if (!isExist.isExist) {
                return res.status(403).json({ status: false });
            }
            return res.status(201).json({ status: true, message: "Token exists successfully." });
        } catch (error) {
            console.log(error.message);
        }
    }


}
