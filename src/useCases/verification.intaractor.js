import { Encrypth } from '../providers/bcryptPassword.js';
import { JwtToken } from '../providers/jwtToken.js';
import { TalentRepository } from '../infrastructure/Repository/talent.Database.js';
import { ClientRepository } from '../infrastructure/Repository/client.Database.js';
import { STATUS_CODES } from '../constants/httpStatusCode.js';
import { get500Response } from '../infrastructure/helperFunctions/response.js';

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
                data: userData.data,
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
            const valid = await this.clientRepository.checkIsValidNumber(id, number)
            if (!valid) {
                return {
                    status: STATUS_CODES.NO_CONTENT,
                    message: "Enter you valid number"
                }
            }
            return {
                status: STATUS_CODES.OK,
                success: true
            }
        }
        const valid = await this.talentRepository.checkIsValidNumber(id, number)
        if (!valid) {
            return {
                status: STATUS_CODES.UNDERSTOOD_BUT_NOT_VALID,
                message: "Enter you valid number"
            }
        }
        return {
            status: STATUS_CODES.OK,
            success: true
        }
    }
    async updateNumberVerifiedStatus(id, role) {
        try {
            let result;
            if (role === "CLIENT") {
                result = await this.clientRepository.updateNumberVerified(id);
            } else if (role === "TALENT") {
                result = result = await this.talentRepository.updateNumberVerified(id);
            } else {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: "Invalid role.",
                    success: false
                };
            }
            return {
                status: STATUS_CODES.OK,
                message: "Successfully verified the number.",
                success: true
            };
        } catch (error) {
            console.error("Error updating number verification status:", error.message);
            return get500Response(error);
        }
    }
}