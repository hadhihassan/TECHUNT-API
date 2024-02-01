import { UserRepository } from '../infrastructure/database/client.database.js';
import { Mailer } from '../providers/EmailService.js';

export class ClientUseCase {
    constructor() {
        this.userRepository = new UserRepository(); // Assuming UserRepository is a class that needs to be instantiated
        this.mailer = new Mailer(); // Assuming Mailer is a class that needs to be instantiated
    }

    async isEmailExist(email) {
        console.log("usecase isEmailExist fun");
        try {
            const existing = await this.userRepository.findByEmail(email);
            return existing;
        } catch (error) {
            console.log(error.message);
        }
    }

    async isTokenExist(token) {
        try {
            const existing = await this.userRepository.findByToken(token);
            return existing;
        } catch (error) {
            console.log(error.message);
        }
    }

    async sendTimeoutLinkEmailVerification(email) {
        try {
            const sent = await this.mailer.sendMaill(email);
            console.log("mailsended here then data",sent,email)
            return sent;
        } catch (error) {
            console.log(error.message);
        }
    }
}

