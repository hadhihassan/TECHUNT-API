import { TalentUseCase } from "../../useCases/talent.UseCase.js";
import { ClientUseCase } from "../../useCases/client.UseCase.js";


export class PlanController {
    constructor(planUesCase) {
        this.planUesCase = planUesCase;
        this.talentUseCase = new TalentUseCase()
        this.clientUseCase = new ClientUseCase()
    }
    createNewPlan = async (req, res) => {
        const data = req.body;
        const result = await this.planUesCase.createNewPlan(data);
        return res.status(result.status).json(result);
    }
    async getAllPlans(req, res) {
        console.log("am here")
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
        console.log("am reached here",id)
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
            console.log(data)
        } else if (result) {
            const data = await this.talentUseCase.saveSuscription(userId, result?.data?._id)
            console.log(data)
        }
        return res.status(result.status).json(result)
    }
    async updatePlan(req,res){
        const {id, data} = req.body;
        const result = await this.planUesCase.updatePlan(id,data);
        return res.status(result.status).json(result)
    }
}