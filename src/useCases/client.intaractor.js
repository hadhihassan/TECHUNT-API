import { ClientRepository } from '../infrastructure/database/client.Database.js';
import { Mailer } from '../providers/EmailService.js';
import { JwtToken } from '../providers/jwtToken.js';



export class ClientUseCase {
    constructor() {
        this.clientRepository = new ClientRepository(); // Assuming UserRepository is a class that needs to be instantiated
        this.mailer = new Mailer(); // Assuming Mailer is a class that needs to be instantiated
        this.jwtToken = new JwtToken()
    }

    async isEmailExist(email) {
        try {
            return await this.clientRepository.findByEmail(email);
        } catch (error) {
            console.log(error.message);
        }
    }

    async isTokenExist(token) {
        try {
            const existing = await this.clientRepository.findByToken(token);
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
            return sent;
        } catch (error) {
            console.log(error.message);
        }
    }

    async saveEmail(email) {
        try {
            const client = await this.clientRepository.addEmail(email)
            const clientAuthToken = await this.jwtToken.generateJwtToken(client._id)
            return { ...JSON.parse(JSON.stringify(client)), clientAuthToken ,role:"CLIENT"}
        } catch (error) {
            console.log(error.message)
        }
    }
}

