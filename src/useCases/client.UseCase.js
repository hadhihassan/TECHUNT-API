import { STATUS_CODES } from '../constants/httpStatusCode.js';
import { ClientRepository } from '../infrastructure/repository/clientDatabase.js';
import { Mailer } from '../providers/EmailService.js';
import { Encrypt } from '../providers/bcryptPassword.js';
import { JwtToken } from '../providers/jwtToken.js';
import { StripPayment } from '../providers/paymentService.js';
import { TransactionRepository } from '../infrastructure/repository/transactionDatabase.js'
import invitationTemplate from '../infrastructure/templates/mail/invitation.js'
import { get200Response, get400Response, get500Response } from '../infrastructure/helperFunctions/response.js';


export class ClientUseCase {
    constructor() {
        this.clientRepository = new ClientRepository();
        this.mailer = new Mailer();
        this.jwtToken = new JwtToken()
        this.encrypt = new Encrypt()
        this.payment = new StripPayment()
        this.transactionRepository = new TransactionRepository();
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
                return true
            }
            return false;
        } catch (error) {
            console.log(error.message);
        }
    }
    async UpdateEmailVerify(id) {
        try {
            const existing = await this.clientRepository.UpdateEmailVerifyTrue(id);
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
            const token = await this.jwtToken.generateJwtToken(client._id, "CLIENT")
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
    async getAllClient() {
        return await this.clientRepository.getAllClientData()
    }
    async blockClient(email, block) {
        return await this.clientRepository.block(email, block)
    }
    async getTransactionHistory(id) {
        try {
            const getResult = await this.transactionRepository.getToTransaction(id);
            if (getResult) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    data: getResult
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false,
            }
        } catch (err) {
            console.log(err)
        }
    }
    async saveSuscription(userId, subscriptionId) {
        try {
            const result = await this.clientRepository.saveSuscription(userId, subscriptionId)
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    data: result
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false
            }
        } catch (err) {
            console.log(err)
        }
    }

    async getJobLink(id) {
        return `https://techunt.vercel.app/talent/job-post/${id}`
    }

    async sendInvitation(getSender, getReceiver, getJobPost) {
        console.log(getJobPost)
        try {
            const result = await this.mailer.sendEmailTransporter(getReceiver.Email, "Invitation to Collaborate on a Project", invitationTemplate(getSender.First_name, getJobPost.Title, getJobPost.Description, await this.getJobLink(getJobPost._id)))
            if (result) {
                return {
                    status: STATUS_CODES.OK,
                    success: true,
                    data: result
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                success: false
            }
        } catch (err) {
            console.log(err)
        }
    }
    async getWalletAmount(id) {
        try {
            const result = await this.clientRepository.findWalletAmount(id)
            if (result) {
                return get200Response(result)
            }
            return get400Response()
        } catch (err) {
            get500Response(err)
        }
    }
    async updateBankDetail(id,data) {
        try {
            const result = await this.clientRepository.updateBankDetail(id,s3Link)
            if (result) {
                return get200Response(result)
            }
            return get400Response()
        } catch (err) {
            get500Response(err)
        }
    }
}

