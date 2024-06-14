import { STATUS_CODES } from '../../constants/httpStatusCode.js';
import { AdminUseCase } from '../../useCases/admin.UseCase.js';

export class AdminContollers {
    constructor() {
        this._adminUseCase = new AdminUseCase()
    }
    async verifyLogin(req, res) {
        const { password, userName } = req.body
        const result = await this._adminUseCase.adminLogin(password, userName)
        return res.status(result.status).json(result)
    }
    async getAllUsers(req, res) {
        let users = await this._adminUseCase.collectAllUserData()
        return res.status(users.status).json(users.users)
    }
    async blockUser(req, res) {
        const { email, block, role } = req.body
        let result = await this._adminUseCase.blockUesr(email, block, role)
        if (result) {
            return res.status(STATUS_CODES.OK).json(result)
        }
        return res.status(STATUS_CODES.NO_CONTENT).json(result)
    }
    async getMonthlydata() {
        const monthData = await this._adminUseCase.getMonthlyRevenue()
        return res.status(monthData.status).json(month)
    }
    async getDashboard(req, res) {
        Promise.all([
            this._adminUseCase.getMonthlyTalent(),
            this._adminUseCase.getMonthlyClient(),
            this._adminUseCase.getRevenue(),
            this._adminUseCase.getMostFreelancer()
        ])
        .then(([monthlyTalent, monthlyClient, overalRevenuse, mostWorkignFreelancer]) => {
            res.status(STATUS_CODES.OK).json({ monthlyTalent, monthlyClient, mostWorkignFreelancer, overalRevenuse });
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "An error occurred" });
        });
        
    }
}