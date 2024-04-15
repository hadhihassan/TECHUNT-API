import { AdminRepository } from "../infrastructure/repository/adminDatabase.js";
import { JwtToken } from '../providers/jwtToken.js';
import { Encrypt } from "../providers/bcryptPassword.js";
import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { ClientUseCase } from "./client.UseCase.js";
import { TalentUseCase } from "./talent.UseCase.js";

export class AdminUseCase {
    constructor() {
        this.jwtToken = new JwtToken()
        this.adminRepository = new AdminRepository()
        this.clientUseCase = new ClientUseCase()
        this.talentUseCase = new TalentUseCase()
        this.encrypt = new Encrypt()
    }
    async adminLogin(password, userName) {
        try {
            const result = await this.adminRepository.findByUserName(userName);
            if (!result.status) {
                return {
                    status: STATUS_CODES.FORBIDDEN,
                    message: "Invalid credentials",
                    token: ""
                };
            }
            const isPasswordCorrect = await this.encrypt.comparePasswords(password, result.data.Password);
            if (!isPasswordCorrect) {
                return {
                    status: STATUS_CODES.FORBIDDEN,
                    message: "Invalid password",
                    token: ""
                };
            }
            const token = await this.jwtToken.generateJwtToken(result.data._id,"ADMIN");
            return {
                status: STATUS_CODES.OK,
                message: "Admin login success",
                token: token
            };
        } catch (error) {
            console.error("Error occurred during admin login:", error);
            return {
                status: STATUS_CODES.INTERNAL_SERVER_ERROR,
                message: "Internal server error",
                token: ""
            };
        }
    }
    async collectAllUserData() {
        const talent = await this.talentUseCase.getAllTalent()
        const client = await this.clientUseCase.getAllClient()
        if (talent && client) {
            return {
                status: STATUS_CODES.OK,
                users: {
                    talent,
                    client
                }
            }
        }
        return {
            status: STATUS_CODES.NO_CONTENT,
            users: null
        }
    }
    async blockUesr(email, block, role) {
        if (role === "CLIENT") {
            const forClient = await this.clientUseCase.blockClient(email, block)
            if (forClient) {
                return forClient
            }
        }else if(role === "TALENT"){
            const forTalent = await this.talentUseCase.blockTalent(email, block)
            return forTalent
        }
    }
    async getRevenue() {
        const talentCount = await this.adminRepository.getYearlyRevenue()
        return talentCount
    }
    async getMonthlyTalent(){
        const monthlyTalent =  await this.adminRepository.monthlyTalent()
        return monthlyTalent
    } 
    async getMonthlyClient(){
        const monthlyTalent =  await this.adminRepository.monthlyClient()
        return monthlyTalent
    } 
    async getMostFreelancer(){
        const mostFreelancer =  await this.adminRepository.mostFreelancer()
        return mostFreelancer
    }
}