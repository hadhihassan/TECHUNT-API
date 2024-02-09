import { STATUS_CODES } from '../constants/httpStatusCode.js';
import { TalentRepository } from '../infrastructure/database/talent.Database.js';
import { Mailer } from '../providers/EmailService.js';
import { Encrypth } from '../providers/bcryptPassword.js';
import { JwtToken } from '../providers/jwtToken.js';



export class TalentUseCase {
    constructor() {
        this.talentRepository = new TalentRepository(); // Assuming UserRepository is a class that needs to be instantiated
        this.mailer = new Mailer(); // Assuming Mailer is a class that needs to be instantiated
        this.jwtToken = new JwtToken();
        this.encrypt = new Encrypth()
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
                return true
            }
            return false;
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

    async saveSignupData(email, scurePassword) {
        try {
            const talent = await this.talentRepository.addTalentSingupData(email, scurePassword)
            const token = await this.jwtToken.generateJwtToken(talent._id)
            return { talent, token, role: "TALENT" }
        } catch (error) {
            console.log(error.message)
            
        }
    }
    async saveConatctDeatils(formData, id) {
        return await this.talentRepository.addConatctDeatils(formData, id)
    }

    async saveProfilePic(filaName, id) {
        return await this.talentRepository.saveProfilePic(filaName, id)
    }
    async verifyLogin(email, password) {
        const talentData = await this.talentRepository.findByEmail(email)
        if (talentData) {
            const passwordMatch = await this.encrypt.comparePasswords(password, talentData.Password)
            if (passwordMatch) {
                return {
                    status: STATUS_CODES.OK,
                    message: "Sucessfully logged.",
                    data: talentData
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
    async saveJobData(data, id){
        return await this.talentRepository.addJobData(data, id)
    }
    async getProfilelData(id){
        return await this.talentRepository.findById(id)
    }
    async editProfileSectionOne(data, id){
        return await this.talentRepository.updateprofile(data, id)
    }
    async editSkills(data, id){
        return await this.talentRepository.updateSkills(data, id)
    }
    async editExperiance(data, id){
        return await this.talentRepository.updateExperiance(data, id)
    }
    async editConatctDeatils(data, id){
        return await this.talentRepository.editConatct(data, id)
    }
    async getAllTalent(){
        return await this.talentRepository.getAllTalentData()
    }
    async blockTalent(email, block){
        return await this.talentRepository.block(email, block)
    }
}

