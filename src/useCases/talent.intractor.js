import { TalentRepository } from '../infrastructure/database/talent.Database.js';
import { Mailer } from '../providers/EmailService.js';
import { JwtToken } from '../providers/jwtToken.js';



export class TalentUseCase {
    constructor() {
        this.talentRepository = new TalentRepository(); // Assuming UserRepository is a class that needs to be instantiated
        this.mailer = new Mailer(); // Assuming Mailer is a class that needs to be instantiated
        this.jwtToken = new JwtToken()
    }

    async isEmailExist(email) {
        try {
            const existing = await this.talentRepository.findByEmail(email);
            return existing;
        } catch (error) {
            console.log(error.message);
        }
    }

    async isTokenExist(token) {
        try {
            const existing = await this.talentRepository.findByToken(token);
            if (existing.isExist) {

            }
            return existing;
        } catch (error) {
            console.log(error.message);
        }
    }

    async sendTimeoutLinkEmailVerification(email) {
        try {
            const sent = await this.mailer.sendMaill(email);
            console.log("mailsended here then data", sent, email)
            return sent;
        } catch (error) {
            console.log(error.message);
        }
    }

    async saveEmail(email) {
        try {
            const talent = await this.talentRepository.saveEmail(email)
            const talentAuthToken = this.jwtToken.generateJwtToken(talent._id)
            return { ...JSON.parse(JSON.stringify(talent)), talentAuthToken ,role:"TALENT"}
        } catch (error) {
            console.log(error.message)
        }
    }
}

