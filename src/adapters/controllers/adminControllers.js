import { STATUS_CODES } from '../../constants/httpStatusCode.js';
import { AdminUseCase } from '../../useCases/admin.intaractor.js';

export class AdminContollers {
    constructor() {
        this.adminUseCase = new AdminUseCase()
    }
    async verifyLogin(req, res) {
        const { password, userName } = req.body
        const result = await this.adminUseCase.adminLogin(password, userName)
        return res.status(result.status).json(result)
    }
    async getAllUsers(req, res) {
        let users = await this.adminUseCase.collectAllUserData()
        return res.status(users.status).json(users.users)
    }
    async blockUser(req, res) {
        const { email,block,role } = req.body
        let result = await this.adminUseCase.blockUesr(email,block,role)
        if(result){
            return res.status(STATUS_CODES.OK).json(result)
        }
        return res.status(STATUS_CODES.NO_CONTENT).json(result)
    }
}