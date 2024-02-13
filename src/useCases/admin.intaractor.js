import { AdminRepository } from "../infrastructure/database/admin.Database.js";
import { JwtToken } from '../providers/jwtToken.js';
import { Encrypth } from "../providers/bcryptPassword.js";
import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { ClientUseCase } from "./client.intaractor.js";
import { TalentUseCase } from "./talent.intractor.js";

export class AdminUseCase {
    constructor() {
        this.jwtToken = new JwtToken()
        this.adminRepository = new AdminRepository()
        this.clientUseCase = new ClientUseCase()
        this.talnetUseCase = new TalentUseCase()
        this.encrypth = new Encrypth()
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
            const isPasswordCorrect = await this.encrypth.comparePasswords(password, result.data.Password);
            if (!isPasswordCorrect) {
                return {
                    status: STATUS_CODES.FORBIDDEN,
                    message: "Invalid password",
                    token: ""
                };
            }
            const token = await this.jwtToken.generateJwtToken(result.data._id);
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
        const talent = await this.talnetUseCase.getAllTalent()
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
        console.log(role, "role is ")
        if (role === "CLIENT") {
            const forClient = await this.clientUseCase.blockClient(email, block)
            if (forClient) {
                return forClient
            }
        }else if(role === "TALENT"){
            const forTalent = await this.talnetUseCase.blockTalent(email, block)
            return forTalent
        }
        // const forClient = await this.clientUseCase.blockClient(email, block)
        // if (forClient) {
        //     return forClient
        // }
        // const forTalent = await this.talnetUseCase.blockTalent(email, block)
        // return forTalent
    }
}