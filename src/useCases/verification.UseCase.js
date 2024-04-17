import { Encrypt } from '../providers/bcryptPassword.js';
import { JwtToken } from '../providers/jwtToken.js';
import { TalentRepository } from '../infrastructure/repository/talentDatabase.js';
import { ClientRepository } from '../infrastructure/repository/clientDatabase.js';
import { STATUS_CODES } from '../constants/httpStatusCode.js';
import { get500Response, get200Response } from '../infrastructure/helperFunctions/response.js';
import { OtpRepository } from '../infrastructure/repository/otpDatabase.js';
import { Mailer } from '../providers/EmailService.js';
import forgetPasswordTemplate from '../infrastructure/templates/mail/forgetPasswordEmail.js';

export class VerificationUseCase {
    constructor() {
        this.talentRepository = new TalentRepository();
        this.clientRepository = new ClientRepository();// Assuming UserRepository is a class that needs to be instantiated
        this.otpRepository = new OtpRepository()
        this.jwtToken = new JwtToken();
        this.encrypt = new Encrypt()
        this.mailer = new Mailer()
    }
    async verifyLogin(email, password) {
        console.log("data base reached", email,password)
        try {
            const talentData = await this.talentRepository.findByEmail(email);
            if (talentData.status) {
                return this.authenticateUser(talentData, password, 'TALENT',);
            }
            console.log(talentData)
            const clientData = await this.clientRepository.findByEmail(email);
            if (clientData.status) {
                return this.authenticateUser(clientData, password, 'CLIENT',);
            }
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
            if (userData?.data.isBlock) {
                return {
                    status: STATUS_CODES.UNAUTHORIZED,
                    message: "Sorry your blocked",
                    isBlocked: true
                };
            }
            const passwordMatch = await this.encrypt.comparePasswords(password, userData?.data?.Password);
            if (passwordMatch) {
                const token = await this.jwtToken.generateJwtToken(userData?.data?._id, role)
                return {
                    status: STATUS_CODES.OK,
                    message: "Successfully logged in.",
                    data: userData?.data,
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
    async addBankDetails(id, role, data) {
        try {
            let result
            if (role === "CLIENT") {
                result = await this.clientRepository.addBankDetail(id, data);
            } else if (role === "TALENT") {
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
        } catch (err) {
            get500Response
        }
    }
    async updateBankDetails(role, userId, data) {
        try {
            let result
            if (role === "CLIENT") {
                result = await this.clientRepository.updateBankDetail(userId, data);
            } else if (role === "TALENT") {
                result = await this.talentRepository.updateBankDetail(userId, data);
            }
            console.log(result)
            return get200Response(result)
        } catch (err) {
            console.log(err)
            return get500Response
        }
    }
    async forGetPassWordEmailCheck(email) {
        try {
            const isTalent = await this.talentRepository.findByEmail(email)
            if (isTalent.status) {
                const isValid = await this.talentRepository.checkForgetEmail(email)
                if (isValid) {
                    const newOtp = await this.otpRepository.createNewOtp(email)
                    if (newOtp) {
                        const sendEmail = await this.mailer.sendEmailTransporter(email, "Forget Password OTP Email", forgetPasswordTemplate(isTalent.data.First_name, newOtp.otpValue))
                        return {
                            status: STATUS_CODES.OK,
                            message: "Otp sended your email .",
                            success: true
                        }
                    }
                }
                return { status: STATUS_CODES.BAD_REQUEST, success: false, message: "Email note valid." }
            } else {
                const isClient = await this.clientRepository.findByEmail(email)
                if (isClient.status) {
                    const isValid = await this.clientRepository.checkForgetEmail(email)
                    if (isValid) {
                        const newOtp = await this.otpRepository.createNewOtp(email)
                        if (newOtp) {
                            const sendEmail = await this.mailer.sendEmailTransporter(email, "Forget Password OTP Email", forgetPasswordTemplate(isClient.data.First_name, newOtp.otpValue))
                            return {
                                status: STATUS_CODES.OK,
                                message: "Otp sended your email .",
                                success: true
                            }
                        }
                    }
                    return { status: STATUS_CODES.BAD_REQUEST, success: false, message: "Email note valid." }
                }
            }
            return { status: STATUS_CODES.BAD_REQUEST, success: false, message: "Email note existing." }
        } catch (error) {
            console.log(error.message)
            get500Response(error)
        }
    }
    async isOtpIsValid(email, otp) {
        try {
            const isValid = await this.otpRepository.checkOtpIsVaid(email, otp)
            if (isValid) {
                if (isValid.otpValue !== otp) {
                    return {
                        status: STATUS_CODES.BAD_REQUEST,
                        message: "Otp is note match ?.",
                        success: false
                    };
                }
                return {
                    status: STATUS_CODES.OK,
                    message: "Otp verfications success.",
                    success: true
                };
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                message: "Invalid otp or otp is expired?.",
                success: false
            };
        } catch (err) {
            get500Response
        }
    }
    async setNewPassword(email, password) {
        try {
            const isTalent = await this.talentRepository.findByEmail(email)
            if (isTalent.status) {
                const bcryptPassword = await this.encrypt.encryptPassword(password)
                const isValid = await this.talentRepository.updatedNewPassword(email, bcryptPassword)
                if (isValid) {
                    return {
                        status: STATUS_CODES.OK,
                        message: "New password updated successfully",
                        success: true
                    };
                }
            } else {
                const isClient = await this.clientRepository.findByEmail(email)
                if (isClient.status) {
                    const bcryptPassword = await this.encrypt.encryptPassword(password)
                    const isValid = await this.clientRepository.updatedNewPassword(email, bcryptPassword)
                    if (isValid) {
                        return {
                            status: STATUS_CODES.OK,
                            message: "New password updated successfully ",
                            success: true
                        };
                    }
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                message: "While updating password got an error ",
                success: false
            };
        } catch (err) {
            get500Response
        }
    }
    
}