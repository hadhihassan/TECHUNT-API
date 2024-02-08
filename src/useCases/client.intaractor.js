import { STATUS_CODES } from '../constants/httpStatusCode.js';
import { ClientRepository } from '../infrastructure/database/client.Database.js';
import { Mailer } from '../providers/EmailService.js';
import { Encrypth } from '../providers/bcryptPassword.js';
import { JwtToken } from '../providers/jwtToken.js';



export class ClientUseCase {
    constructor() {
        this.clientRepository = new ClientRepository(); // Assuming UserRepository is a class that needs to be instantiated
        this.mailer = new Mailer(); // Assuming Mailer is a class that needs to be instantiated
        this.jwtToken = new JwtToken()
        this.encrypt = new Encrypth()
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
                return false
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

    async saveSignupData(email, encryptedPassword) {
        try {
            const client = await this.clientRepository.addClientSingupData(email, encryptedPassword)
            const token = await this.jwtToken.generateJwtToken(client._id)
            return { client, token, role: "CLIENT" }
        } catch (error) {
            console.log(error.message)
        }
    }
    async saveConatctDeatils(formData, id) {
        return await this.clientRepository.addConatctDeatils(formData, id)
    }
    async saveProfilePic(filaName, id) {
        return await this.clientRepository.saveProfilePic(filaName, id)
    }
    async verifyLogin(email, password) {
        const clientData = await this.clientRepository.findByEmail(email)
        if (clientData.status) {
            const passwordMatch = await this.encrypt.comparePasswords(password, clientData.data.Password)
            console.log("password match ", passwordMatch);
            if (passwordMatch) {
                return {
                    status: STATUS_CODES.OK,
                    message: "Sucessfully logged.",
                    data: clientData
                }
            } else {
                return {
                    status: STATUS_CODES.UNAUTHORIZED,
                    message: "password is incorrect.",
                    data: null
                }
            }
        } else {
            return {
                status: STATUS_CODES.UNAUTHORIZED,
                message: "Email is incorrect.",
                data: null
            }
        }
    }
    async getProfilelData(id) {
        return await this.clientRepository.findById(id)
    }
    async editProfileSectionOne(data, id) {
        return await this.clientRepository.updateprofile(data, id)
    }
    async editConatctDeatils(data, id) {
        return await this.clientRepository.editConatct(data, id)
    }
}

