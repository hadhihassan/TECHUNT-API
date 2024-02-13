import { STATUS_CODES } from '../../constants/httpStatusCode.js';
import { AdminUseCase } from '../../useCases/admin.intaractor.js';

export class AdminContollers {
    constructor() {
        this.adminUseCase = new AdminUseCase()
    }
    async verifyLogin(req, res) {
        const { password, userName } = req.body
        console.log(req.body);
        const result = await this.adminUseCase.adminLogin(password, userName)
        console.log(result);
        return res.status(result.status).json(result)
    }
    async getAllUsers(req, res) {
        console.log("reqquest is here")
        let users = await this.adminUseCase.collectAllUserData()
        console.log(users.talent)
        return res.status(users.status).json(users.users)
    }
    async blockUser(req, res) {
        const { email,block,role } = req.body
        console.log(email,block)
        let result = await this.adminUseCase.blockUesr(email,block,role)
        if(result){
            return res.status(STATUS_CODES.OK).json(result)
        }
        return res.status(STATUS_CODES.NO_CONTENT).json(result)
    }
}