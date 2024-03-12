import { Encrypt } from '../providers/bcryptPassword.js';
import { JwtToken } from '../providers/jwtToken.js';
import { TalentRepository } from '../infrastructure/Repository/talent.Database.js';
import { ClientRepository } from '../infrastructure/Repository/client.Database.js';
import { STATUS_CODES } from '../constants/httpStatusCode.js';
import { get500Response } from '../infrastructure/helperFunctions/response.js';
import countProperties from '../infrastructure/helperFunctions/calculateProfileCompletion.js';

export class VerificationUseCase {
    constructor() {
        this.talentRepository = new TalentRepository();
        this.clientRepository = new ClientRepository();// Assuming UserRepository is a class that needs to be instantiated
        this.jwtToken = new JwtToken();
        this.encrypt = new Encrypt()
    }
    async verifyLogin(email, password) {
        try {
            const talentData = await this.talentRepository.findByEmail(email);
            if (talentData.status) {
                return this.authenticateUser(talentData, password, 'TALENT',);
            }
            const clientData = await this.clientRepository.findByEmail(email);
            if (clientData.status) {
                return this.authenticateUser(clientData, password, 'CLIENT',);
            }
            console.log(clientData)
            return {
                status: STATUS_CODES.UNAUTHORIZED,
                message: "Invalid email or password.",
                data: null
            };
        } catch (error) {
            get500Response(error)
        }
    }
    async authenticateUser(userData, password, role) {
        try {
            if (userData.data.isBlock) {
                return {
                    status: STATUS_CODES.UNAUTHORIZED,
                    message: "Sorry your blocked",
                    isBlocked: true
                };
            }
            const passwordMatch = await this.encrypt.comparePasswords(password, userData.data.Password);
            if (passwordMatch) {
                const token = await this.jwtToken.generateJwtToken(userData.data._id, role)
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
        } catch (error) {
            get500Response(error)
        }
    }
    async checkValidity(number, role, id) {
        try {
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
        } catch (error) {
            get500Response(error)
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
            get500Response(error);
        }
    }
    async addBankDetails(id, role, data){
        try{
            let result 
            if(role === "CLIENT"){
                result = await this.clientRepository.addBankDetail(id, data);
            }else if(role === "TALENT"){
                result = await this.talentRepository.addBankDetail(id, data);
            } else {
                return {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: "Invalid role.",
                    success: false
                };
            }
            return {
                status: STATUS_CODES.OK,
                message: "Successfully bank details uploaded.",
                success: true
            };
        }catch(err){
            get500Response
        }
    }
}