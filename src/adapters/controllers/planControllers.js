import { TalentUseCase } from "../../useCases/talent.UseCase.js";
import { ClientUseCase } from "../../useCases/client.UseCase.js";
import { TransactionUseCase } from "../../useCases/transactionUseCase.js";

export class PlanController {
    constructor(planUesCase) {
        this.planUesCase = planUesCase;
        this.talentUseCase = new TalentUseCase()
        this.clientUseCase = new ClientUseCase()
        this.transactionUseCase = new TransactionUseCase()
    }
    createNewPlan = async (req, res) => {
        const data = req.body.data;
        const result = await this.planUesCase.createNewPlan(req.body);
        return res.status(result.status).json(result);
    }
    async getAllPlans(req, res) {
        const result = await this.planUesCase.getAllPlan();
        return res.status(result.status).json(result);
    }
    async createNewPlan(req, res) {
        const { planId: id, status } = req.body;
        const result = await this.planUesCase.disablePlan(id, status);
        return res.status(result.status).json(result);
    }
    async getPlan(req, res) {
        const { id } = req.params;
        const result = await this.planUesCase.getPlan(id);
        return res.status(result.status).json(result);
    }
    async deletePlan(req, res) {
        const { id } = req.params;
        const result = await this.planUesCase.disablePlan(id)
        return res.status(result.status).json(result)
    }
    async makePaymentForSubscrition(req, res) {
        const { amount } = req.body
        const userId = req.clientId
        const result = await this.planUesCase.makePlanPayment(userId, amount)
        await this.transactionUseCase.saveNewTransaction(amount, "Application", userId, "Subscription")
        return res.status(result.status).json(result)
    }
    async getPlanForUsers(req, res) {
        const result = await this.planUesCase.getPlansForUser()
        return res.status(result.status).json(result)
    }
    async purchasePlan(req, res) {
        const { planId } = req.body
        const userId = req.clientId
        const result = await this.planUesCase.purchasePlan(planId, userId)
        if (result && req.role === "CLIENT") {
            const data = await this.clientUseCase.saveSuscription(userId, result?.data?._id)
        } else if (result) {
            const data = await this.talentUseCase.saveSuscription(userId, result?.data?._id)
        }
        return res.status(result.status).json(result)
    }
    async updatePlan(req, res) {
        const { id, data } = req.body;
        const result = await this.planUesCase.updatePlan(id, data);
        return res.status(result.status).json(result)
    }
}