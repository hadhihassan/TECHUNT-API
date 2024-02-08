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
            return this.authenticateUser(talentData.data, password, 'TALENT');
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
        console.log(userData, password, role);
        const passwordMatch = await this.encrypt.comparePasswords(password, userData.Password);
        console.log(passwordMatch);
        if (passwordMatch) {
            const token = await this.jwtToken.generateJwtToken(userData._id)
            console.log(token,"this is an  token jwt =>")
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
}