import { Encrypth } from '../providers/bcryptPassword.js';
import { JwtToken } from '../providers/jwtToken.js';
import { TalentRepository } from '../infrastructure/database/talent.Database.js';
import { ClientRepository } from '../infrastructure/database/client.Database.js';
import { STATUS_CODES } from '../constants/httpStatusCode.js';



export class VerificationUseCase {
    constructor() {
        this.talentRepository = new TalentRepository();
        this.clientRepository = new ClientRepository();// Assuming UserRepository is a class that needs to be instantiated
        this.jwtToken = new JwtToken();
        this.encrypt = new Encrypth()
    }

    async verifyLogin(email, password) {
        const talentData = await this.talentRepository.findByEmail(email);
        if (talentData.status) {
            return this.authenticateUser(talentData, password, 'TALENT');
        }
        const clientData = await this.clientRepository.findByEmail(email);
        if (clientData.status) {
            return this.authenticateUser(clientData, password, 'CLIENT');
        }
        // No user found with the provided email
        return {
            status: STATUS_CODES.UNAUTHORIZED,
            message: "Invalid email or password.",
            data: null
        };
    }

    async authenticateUser(userData, password, role) {
        if (userData.data.isBlock) {
            return {
                status: STATUS_CODES.UNAUTHORIZED,
                message: "Sorry youre blocked",
                isBlocked: true
            };
        }
        const passwordMatch = await this.encrypt.comparePasswords(password, userData.data.Password);
        if (passwordMatch) {
            const token = await this.jwtToken.generateJwtToken(userData.data._id)
            return {
                status: STATUS_CODES.OK,
                message: "Successfully logged in.",
                data: userData,
                role: role,
                token
            };
        } else {
            return {
                status: STATUS_CODES.UNAUTHORIZED,
                message: "Invalid email or password.",
                data: null
            };
        }
    }
    async checkValidity(number, role, id) {
        if (role === "CLIENT") {
            const valid = await this.clientRepository.findById(id)
            console.log(valid)
            if (valid === null) {
                return {
                    status: STATUS_CODES.NO_CONTENT,
                    message: "Enter you valid number"
                }
            }
            if (valid.Number === number) {
                if (!valid.isNumberVerify) {
                    return {
                        status: STATUS_CODES.OK,
                        message: "Otp sended. Check you sms"
                    }
                }
                return {
                    status: STATUS_CODES.UNDERSTOOD_BUT_NOT_VALID,
                    message: "Your number is already verified"
                }
            }
            return {
                status: STATUS_CODES.UNDERSTOOD_BUT_NOT_VALID,
                message: "Enter you valid number"
            }
        }
        const valid = await this.talentRepository.findById(id)
        console.log(valid)
        if (valid === null) {
            return {
                status: STATUS_CODES.OK,
                message: "Enter you valid number"
            }
        }
        if (valid.Number === number) {
            if (!valid.isNumberVerify) {
                return {
                    status: STATUS_CODES.OK,
                    message: "Otp sended. Check you sms"
                }
            } return {
                status: STATUS_CODES.UNDERSTOOD_BUT_NOT_VALID,
                message: "Your number is already verified"
            }
        }
        return {
            status: STATUS_CODES.UNDERSTOOD_BUT_NOT_VALID,
            message: "Enter you valid number"
        }
    }
}